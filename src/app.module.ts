import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProduitModule } from './produit/produit.module';

import { env } from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './produit/entities/produit.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.MYSQL_HOST,
      port: parseInt(env.MYSQL_PORT),
      username: env.MYSQL_USER,
      password: env.MYSQL_PASSWORD,
      database: env.MYSQL_DB_NAME,
      entities: [Produit],
      synchronize: true,
    }),
   
    ProduitModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
