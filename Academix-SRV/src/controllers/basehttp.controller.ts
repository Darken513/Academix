import { Response } from 'express';
import { BaseHttpService } from '../services/basehttp.service';
import { ObjectLiteral } from 'typeorm';
import { AppRequest } from '../core/AppRequest';

export abstract class BaseHttpController<T extends ObjectLiteral> {

  protected DAOMapper: any;
  constructor(protected service: BaseHttpService<T>) {
    this.service = service;
  }

  private applyDAOMapper(def: T, role: string): T {
    if (!this.DAOMapper) return def;

    const allowedFields = this.DAOMapper[role] || this.DAOMapper.any;
    if (!allowedFields) return def;

    const filterRecursive = (obj: any, allowed: any): any => {
      return Object.keys(obj).reduce((filteredObj, key) => {
        if (allowed[key] === true) {
          filteredObj[key] = obj[key];
        } else if (typeof allowed[key] === 'object' && typeof obj[key] === 'object') {
          filteredObj[key] = filterRecursive(obj[key], allowed[key]);
        }
        return filteredObj;
      }, {} as any);
    };

    return filterRecursive(def, allowedFields);
  }

  public async getAll(req: AppRequest, res: Response): Promise<void> {
    try {
      let defs = await this.service.getAll();
      res.json(defs.map(def => this.applyDAOMapper(def, req.decodedToken.role)));
    } catch (error) {
      console.error('Error getting documents:', error);
      res.status(500).json({ title: 'Error', body: 'No Data available.' });
    }
  }

  public async getById(req: AppRequest, res: Response): Promise<void> {
    try {
      const def = await this.service.getById(Number(req.params.id));
      if (!def) {
        res.status(404).json({ title: 'Error', body: 'Item not found.' });
      } else {
        res.json(this.applyDAOMapper(def, req.decodedToken.role));
      }
    } catch (error) {
      console.error('Error getting document:', error);
      res.status(500).json({ title: 'Error', body: 'No Data available.' });
    }
  }

  public async create(req: AppRequest, res: Response): Promise<void> {
    try {
      const def = await this.service.create(req.body);
      res.json({ new: def });
    } catch (error) {
      console.error('Error adding document:', error);
      res.status(500).json({ done: false });
    }
  }

  public async deleteById(req: AppRequest, res: Response): Promise<void> {
    try {
      await this.service.deleteById(Number(req.params.id));
      res.json({ done: true });
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(500).json({ done: false });
    }
  }
}