import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProduitModule } from './produit/produit.module';

import { env } from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './produit/entities/produit.entity';

console.log(env.DB_HOST)  
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT),
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      entities: [Produit],
      synchronize: true,
    }),
   
    ProduitModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
