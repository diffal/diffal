import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class TestBedModule {
  static forRoot(): DynamicModule {
    return {
      module: TestBedModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          synchronize: true,
          logging: false,
          autoLoadEntities: true,
        }),
      ],
    };
  }
}
