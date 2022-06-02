import {Module} from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import {AccesslogModule} from'./accesslog/accesslog.module'
import {CustomerModule} from'./customer/customer.module'
import {OwnerModule} from './owner/owner.module'
@Module({
  imports: [
    AccesslogModule,
    CustomerModule,
    MoviesModule,
    OwnerModule
  ],
  providers: [],
  exports: [],
})
export class V1Module {
}
