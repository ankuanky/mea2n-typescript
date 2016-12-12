export * from './admin-guard.service';
export * from './auth-guard.service';
export * from './auth.service';
export * from './validation.service';
export * from './http.service';
export * from './cookie.service';
export * from './utilityService';
export * from './uploadfile.service';

import { AdminGuard } from './admin-guard.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { ValidationService } from './validation.service';
import { HttpService } from './http.service';
import { CookieService } from './cookie.service';
import { UtilityService } from './utilityService';
import { UploadService } from './uploadfile.service';

export const SHARED_APP_SERVICES = [
  AdminGuard,
  AuthGuard,
  AuthService,
  ValidationService,
  HttpService,
  CookieService,
  UtilityService,
  UploadService
];
