import { Observable } from 'rxjs';
import {
	ActivatedRouteSnapshot,
	CanDeactivateFn,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
 
export interface CanComponentDeactivate {
	canDeactivate: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
	component: CanComponentDeactivate,
	currentRoute: ActivatedRouteSnapshot,
	currentState: RouterStateSnapshot,
	nextState?: RouterStateSnapshot // this will be called at the end when you want to leave a route
): 
	Observable<boolean | UrlTree> | 
	Promise<boolean | UrlTree> | 
	boolean | 
	UrlTree => {
		return component.canDeactivate();
	}