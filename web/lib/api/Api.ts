/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserDto {
  /** @example "John12" */
  username: string;
  /**
   * @minLength 6
   * @example "JohnDOE1234"
   */
  password: string;
  /** @example "John" */
  email?: string | null;
  /** @example "Doe" */
  lastname?: string | null;
  /** @example "ADMINISTRATOR" */
  role: "ADMINISTRATOR" | "EDITOR" | "VISITOR" | null;
}

export type UpdateUserDto = object;

export interface CreateTestimonialDto {
  /**
   * User ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  user_id: string;
  /**
   * Category ID
   * @example "123e4567-e89b-12d3-a456-426614174001"
   */
  category_id?: string;
  /**
   * Testimonial title
   * @example "Great service!"
   */
  title: string;
  /**
   * Testimonial content
   * @example "Amazing experience..."
   */
  content?: string;
  /**
   * Media URL
   * @example "https://example.com/image.jpg"
   */
  media_url?: string;
  /**
   * Media type (image, video, etc.)
   * @example "image"
   */
  media_type?: string;
  /**
   * Status (draft, published, etc.)
   * @example "published"
   */
  status?: string;
  /**
   * Tag IDs
   * @example ["123e4567-e89b-12d3-a456-426614174002","123e4567-e89b-12d3-a456-426614174003"]
   */
  tagIds?: string[];
}

export type UpdateTestimonialDto = object;

export type CreateCategoryDto = object;

export type UpdateCategoryDto = object;

export type CreateTagDto = object;

export type UpdateTagDto = object;

export interface LoginDto {
  /**
   * Username
   * @example "johndoe"
   */
  username: string;
  /**
   * Password
   * @minLength 6
   * @example "password123"
   */
  password: string;
}

export interface RegisterDto {
  /**
   * Username
   * @example "johndoe"
   */
  username: string;
  /**
   * Email address
   * @example "john@example.com"
   */
  email: string;
  /**
   * Password
   * @minLength 6
   * @example "password123"
   */
  password: string;
  /**
   * First name
   * @example "John"
   */
  name?: string;
  /**
   * Last name
   * @example "Doe"
   */
  lastname?: string;
  /**
   * User role
   * @example "VISITOR"
   */
  role?: "ADMINISTRATOR" | "EDITOR" | "VISITOR";
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title CMS - testimonial
 * @version 1.0.0
 * @contact
 *
 * API para gestionar testimonios, usuarios y contenido del CMS.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerCreate
     * @request POST:/users
     */
    usersControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindAll
     * @request GET:/users
     */
    usersControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindOne
     * @request GET:/users/{id}
     */
    usersControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdate
     * @request PATCH:/users/{id}
     */
    usersControllerUpdate: (
      id: string,
      data: UpdateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/users/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerRemove
     * @request DELETE:/users/{id}
     */
    usersControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  testimonials = {
    /**
     * No description
     *
     * @tags Testimonials
     * @name TestimonialsControllerCreate
     * @request POST:/testimonials
     */
    testimonialsControllerCreate: (
      data: CreateTestimonialDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/testimonials`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Testimonials
     * @name TestimonialsControllerFindAll
     * @request GET:/testimonials
     */
    testimonialsControllerFindAll: (
      query: {
        userId: string;
        categoryId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/testimonials`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Testimonials
     * @name TestimonialsControllerFindOne
     * @request GET:/testimonials/{id}
     */
    testimonialsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/testimonials/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Testimonials
     * @name TestimonialsControllerUpdate
     * @request PATCH:/testimonials/{id}
     */
    testimonialsControllerUpdate: (
      id: string,
      data: UpdateTestimonialDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/testimonials/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Testimonials
     * @name TestimonialsControllerRemove
     * @request DELETE:/testimonials/{id}
     */
    testimonialsControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/testimonials/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  categories = {
    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerCreate
     * @request POST:/categories
     */
    categoriesControllerCreate: (
      data: CreateCategoryDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/categories`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerFindAll
     * @request GET:/categories
     */
    categoriesControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/categories`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerFindOne
     * @request GET:/categories/{id}
     */
    categoriesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/categories/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerUpdate
     * @request PATCH:/categories/{id}
     */
    categoriesControllerUpdate: (
      id: string,
      data: UpdateCategoryDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/categories/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerRemove
     * @request DELETE:/categories/{id}
     */
    categoriesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/categories/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  tags = {
    /**
     * No description
     *
     * @tags Tags
     * @name TagsControllerCreate
     * @request POST:/tags
     */
    tagsControllerCreate: (data: CreateTagDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tags`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name TagsControllerFindAll
     * @request GET:/tags
     */
    tagsControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tags`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name TagsControllerFindOne
     * @request GET:/tags/{id}
     */
    tagsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tags/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name TagsControllerUpdate
     * @request PATCH:/tags/{id}
     */
    tagsControllerUpdate: (
      id: string,
      data: UpdateTagDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/tags/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name TagsControllerRemove
     * @request DELETE:/tags/{id}
     */
    tagsControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tags/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @request POST:/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @request POST:/auth/register
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
