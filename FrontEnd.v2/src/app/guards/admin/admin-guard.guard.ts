import {CanActivateFn} from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token');
  if (token != null) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/-/g, '/');
    const jsonPayLoad = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    let decodedToken: any = JSON.parse(jsonPayLoad);
    if (decodedToken.authorities[0] === 'ADMIN') {
      return true;
    } else {
      return false
    }
  } else {
    return false
  }
};
