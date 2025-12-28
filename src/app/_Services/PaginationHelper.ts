import { HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Member } from "../Models/member";
import { userParams } from "../Models/userParams";
import { signal } from "@angular/core";
import { PaginatedResult } from "../Models/Pagnation";

export namespace PaginationHelper {

    export function setPaginatiedResponse<T>(res: HttpResponse<T>,
        PaginationResultSignal: ReturnType<typeof signal<PaginatedResult<T> | null>>) {
        PaginationResultSignal.set({
            items: res.body as T,
            Pagination: JSON.parse(res.headers.get('Pagination')!)
        });
    }

    export function setPaginationHeader(userParams: userParams, ablnaddextraParams: boolean = false): HttpParams {
        let params = new HttpParams();

        params = params.appendAll({
            'pageNumber': userParams.pageNumber,
            'pageSize': userParams.pageSize,
        });
        if (ablnaddextraParams) {
            params = AppendExtraPage(userParams, params);
        }


        return params;
    }

    function AppendExtraPage(userParams: userParams, params: HttpParams): HttpParams {
        params = params.appendAll({
            'minAge': userParams.minAge,
            'maxAge': userParams.maxAge,
            'gender': userParams.gender,
            'orderBy': userParams.OrderBy
        });
        return params;
    }
};

