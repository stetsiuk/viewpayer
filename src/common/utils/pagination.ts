import { HydratedDocument, Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { PaginationQueryDto } from '@/common/dto/pagination.dto';

export class Pagination {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string;

  constructor(query: PaginationQueryDto) {
    this.page = query.page;
    this.limit = query.limit;
    this.sort = query.sort;
    this.filter = query.filter;
  }

  public async wrapPagination(results: HydratedDocument<any> | HydratedDocument<any>[], model: Model<any>) {
    const totalCount = await model.countDocuments();
    const totalPages = this.limit ? Math.ceil(totalCount / this.limit) : undefined;
    const currentPage = this.limit && this.page ? Number(this.page) : undefined;
    return {
      totalCount,
      totalPages,
      currentPage,
      results,
    };
  }

  public parse() {
    const pagination = this.getPagination();
    const sort = this.getSort();
    const filter = this.getFilter();

    const query = {};
    if (filter) Object.assign(query, filter);

    return {
      query,
      options: {
        ...pagination,
        sort,
      },
    };
  }

  private getPagination() {
    if (!this.page || !this.limit) {
      return {};
    }

    const skip = (this.page - 1) * this.limit;
    return { skip, limit: this.limit };
  }

  private getFilter() {
    if (!this.filter) {
      return null;
    }
    const [field, value] = this.filter.split('_');
    const filterObject = {};
    filterObject[field] = { $regex: new RegExp(value, 'i') };
    return filterObject;
  }

  private getSort() {
    if (this.sort) {
      const [field, order] = this.sort.split('_');
      if (!order || !['desc', 'asc'].includes(order.toLowerCase())) {
        throw new BadRequestException('Error with sort param');
      }
      const sortObject = {};
      sortObject[field] = order.toLowerCase() === 'desc' ? -1 : 1;
      return sortObject;
    }
    return { createdAt: -1 };
  }
}
