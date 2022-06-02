import { Connection } from 'mongoose';
import { OwnerSchema } from '../schemas/owner.schema';
export const OwnersProvider = [
  {
    provide: 'OWNERS_MODEL',
    useFactory: (connection: Connection): any => {
      if (!connection) return;
      return connection.model('owners', OwnerSchema, 'owners');
    },
    inject: ['MONGODB_PROVIDER'],
  },
];
