# DatingAppClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




What is a Signal?

A Signal is a special variable that:

Holds a value

Notifies Angular automatically when the value changes

Updates the UI without manual subscription


npm i ngx-toastr
for toaster information

npm i bootstap
ng g interceptor 

.flat()

.flat() converts multiple arrays into one array.


track member.id – Why it is used

track tells Angular how to uniquely identify each item in the list.

Here, Angular uses member.id as a unique key.

This helps Angular optimize rendering.

Why it matters

Without track:

Angular may destroy and recreate DOM elements unnecessarily.

With track member.id:

Angular updates only the changed item

Better performance, especially for large lists

Example

If one member changes:

❌ Without track → whole list may re-render

✅ With track member.id → only that member updates

let i = index – Why it is used

index gives the position of the current item in the loop.

i is just a variable name you choose.

| `@ViewChild`                 | `@Input`              |
| ---------------------------- | --------------------- |
| Parent → Child (view access) | Parent → Child (data) |
| Reads template               | Receives data         |
| Used in TS                   | Used in component API |


npm install ngx-spinner@18
for loader

tap() is used to perform side effects in an observable without changing the data.

✅ What withCredentials = false does

Stops sending cookies and auth credentials

Avoids CORS issues

Allows file upload to succeed

@Self() means: “Inject this dependency only from here, not from parent.”
If the dependency is not found on the same element, Angular throws an error.



With observe: 'response'
this.http.get<Member[]>(url, { observe: 'response' })

Angular returns a full HTTP response object:
HttpResponse<Member[]>
{
  body: Member[],
  headers: HttpHeaders,
  status: 200,
  statusText: "OK",
  url: "..."
}


[...array] uses the spread operator (...) in TypeScript / JavaScript.

It is mainly used to copy, merge, or expand arrays without changing the original array.
const arr1 = [1, 2];
const arr2 = [3, 4];

const merged = [...arr1, ...arr2];

console.log(merged); // [1, 2, 3, 4]
function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const values = [1, 2, 3];

sum(...values); // 6
reduce() is used to convert an array into a single value by applying a function to each element and accumulating the result.