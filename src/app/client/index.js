import '../../../common/style/reset.scss';
import '../../../common/style/main/main.scss';
import { ClientRouter } from '../routes';
import { hydrate } from '@rune-ts/server';
hydrate(ClientRouter);
