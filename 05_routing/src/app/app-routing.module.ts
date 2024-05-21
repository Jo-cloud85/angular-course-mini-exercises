import { ErrorPageComponent } from './error-page/error-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

import { canActivateChildGuard } from './auth-guard.service';
import { serverResolver } from './servers/server/server-resolver.service';
import { canDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';

// ** is the wildcard meaning catch all possible unknown paths - must be the last one
const appRoutes: Routes = [
    { path: '', component: HomeComponent }, 
    { 
        path: 'users', 
        component: UsersComponent, 
        children: [{ 
            path: ':id/:name', 
            component: UserComponent 
        }] 
    },
    {
        path: 'servers',
        // canActivate: [ canActivateGuard ],
        canActivateChild: [ canActivateChildGuard ],
        component: ServersComponent,
        children: [{ 
            path: ':id', 
            component: ServerComponent, 
            resolve: { server: serverResolver } // notice for resolve, we use {key: value} not []
        },
        { 
            path: ':id/edit', 
            component: EditServerComponent, 
            canDeactivate: [ canDeactivateGuard ] 
        }]
    },
    // { path: 'not-found', component: PageNotFoundComponent },
    { 
        path: 'not-found', 
        component: ErrorPageComponent,
        data: {message: 'Page not found!'}
    },
    { 
        path: '**', 
        redirectTo: '/not-found' 
    }
]

// We need exports because we need to outsource all the above routes
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

/*
In our example, we didn't encounter any issues when we tried to redirect the user. But that's not always 
the case when adding re-directions.

By default, Angular matches paths by prefix. That means that the following route will match both /recipes  
and just / 
{ path: '', redirectTo: '/somewhere-else' } 

Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS 
redirect you! Why?

Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does 
start with the path specified in the route. Of course every path starts with ''  (Important: That's no 
whitespace, it's simply "nothing").

To fix this behavior, you need to change the matching strategy to "full" :
{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' } 

Now, you only get redirected, if the full path is ''  (so only if you got NO other content in your path
in this example).
*/