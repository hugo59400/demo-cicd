import { Injectable, NotFoundException  } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitService {


  constructor(
    @InjectRepository(Produit)
    private produits: Repository<Produit>,
  ) {}



  create(createProduitDto: CreateProduitDto) {
    const produit = this.produits.create(createProduitDto);
    return this.produits.save(produit);
  }

  async findAll() {
    return await this.produits.find();
  }

  async findOne(id: number) {
    const result = await this.produits.findOneBy({ id });
    if (result === null) {
      throw new NotFoundException();
    }
    return result;
  }

  async update(id: number, updateProduitDto: UpdateProduitDto) {
    const update = await this.produits.update({ id }, updateProduitDto);
    if (update.affected === 0) {
      throw new NotFoundException();
    }
    return update;
  }

  async remove(id: number) {
    const deleteResponse = await this.produits.delete(id);
    if (deleteResponse.affected === 0) {
      throw new NotFoundException();
    }
    return deleteResponse;
  }
}
