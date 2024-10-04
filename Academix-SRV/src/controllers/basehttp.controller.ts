import { Request, Response } from 'express';
import { BaseHttpService } from '../services/basehttp.service';
import { ObjectLiteral } from 'typeorm';

export abstract class BaseHttpController<T extends ObjectLiteral> {

  constructor(protected service: BaseHttpService<T>) {
    this.service = service;
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const defs = await this.service.getAll();
      res.json({ defs });
    } catch (error) {
      console.error('Error getting documents:', error);
      res.status(500).json({ title: 'Error', body: 'No Data available.' });
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const def = await this.service.getById(Number(req.params.id));
      if (!def) {
        res.status(404).json({ title: 'Error', body: 'Item not found.' });
      } else {
        res.json({ def });
      }
    } catch (error) {
      console.error('Error getting document:', error);
      res.status(500).json({ title: 'Error', body: 'No Data available.' });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const def = await this.service.create(req.body);
      res.json({ new: def });
    } catch (error) {
      console.error('Error adding document:', error);
      res.status(500).json({ done: false });
    }
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    try {
      await this.service.deleteById(Number(req.params.id));
      res.json({ done: true });
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(500).json({ done: false });
    }
  }
}