/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateBookInput = {
  id?: string | null;
  title: string;
  author: string;
  status: number;
  description?: string | null;
  pageNumber?: number | null;
  pages?: number | null;
  tags?: Array<string | null> | null;
  queue_pos?: number | null;
  startDate?: string | null;
  goalFinishDate?: string | null;
  finishDate?: string | null;
  rating?: number | null;
  sessions?: Array<SessionInput | null> | null;
};

export type SessionInput = {
  date?: string | null;
  startPage?: number | null;
  endPage?: number | null;
};

export type ModelBookConditionInput = {
  title?: ModelStringInput | null;
  author?: ModelStringInput | null;
  status?: ModelIntInput | null;
  description?: ModelStringInput | null;
  pageNumber?: ModelIntInput | null;
  pages?: ModelIntInput | null;
  tags?: ModelStringInput | null;
  queue_pos?: ModelIntInput | null;
  startDate?: ModelStringInput | null;
  goalFinishDate?: ModelStringInput | null;
  finishDate?: ModelStringInput | null;
  rating?: ModelIntInput | null;
  and?: Array<ModelBookConditionInput | null> | null;
  or?: Array<ModelBookConditionInput | null> | null;
  not?: ModelBookConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateBookInput = {
  id: string;
  title?: string | null;
  author?: string | null;
  status?: number | null;
  description?: string | null;
  pageNumber?: number | null;
  pages?: number | null;
  tags?: Array<string | null> | null;
  queue_pos?: number | null;
  startDate?: string | null;
  goalFinishDate?: string | null;
  finishDate?: string | null;
  rating?: number | null;
  sessions?: Array<SessionInput | null> | null;
};

export type DeleteBookInput = {
  id?: string | null;
};

export type ModelBookFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  author?: ModelStringInput | null;
  status?: ModelIntInput | null;
  description?: ModelStringInput | null;
  pageNumber?: ModelIntInput | null;
  pages?: ModelIntInput | null;
  tags?: ModelStringInput | null;
  queue_pos?: ModelIntInput | null;
  startDate?: ModelStringInput | null;
  goalFinishDate?: ModelStringInput | null;
  finishDate?: ModelStringInput | null;
  rating?: ModelIntInput | null;
  and?: Array<ModelBookFilterInput | null> | null;
  or?: Array<ModelBookFilterInput | null> | null;
  not?: ModelBookFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type CreateBookMutation = {
  __typename: "Book";
  id: string;
  title: string;
  author: string;
  status: number;
  description: string | null;
  pageNumber: number | null;
  pages: number | null;
  tags: Array<string | null> | null;
  queue_pos: number | null;
  startDate: string | null;
  goalFinishDate: string | null;
  finishDate: string | null;
  rating: number | null;
  sessions: Array<{
    __typename: "Session";
    date: string | null;
    startPage: number | null;
    endPage: number | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateBookMutation = {
  __typename: "Book";
  id: string;
  title: string;
  author: string;
  status: number;
  description: string | null;
  pageNumber: number | null;
  pages: number | null;
  tags: Array<string | null> | null;
  queue_pos: number | null;
  startDate: string | null;
  goalFinishDate: string | null;
  finishDate: string | null;
  rating: number | null;
  sessions: Array<{
    __typename: "Session";
    date: string | null;
    startPage: number | null;
    endPage: number | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteBookMutation = {
  __typename: "Book";
  id: string;
  title: string;
  author: string;
  status: number;
  description: string | null;
  pageNumber: number | null;
  pages: number | null;
  tags: Array<string | null> | null;
  queue_pos: number | null;
  startDate: string | null;
  goalFinishDate: string | null;
  finishDate: string | null;
  rating: number | null;
  sessions: Array<{
    __typename: "Session";
    date: string | null;
    startPage: number | null;
    endPage: number | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type GetBookQuery = {
  __typename: "Book";
  id: string;
  title: string;
  author: string;
  status: number;
  description: string | null;
  pageNumber: number | null;
  pages: number | null;
  tags: Array<string | null> | null;
  queue_pos: number | null;
  startDate: string | null;
  goalFinishDate: string | null;
  finishDate: string | null;
  rating: number | null;
  sessions: Array<{
    __typename: "Session";
    date: string | null;
    startPage: number | null;
    endPage: number | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type ListBooksQuery = {
  __typename: "ModelBookConnection";
  items: Array<{
    __typename: "Book";
    id: string;
    title: string;
    author: string;
    status: number;
    description: string | null;
    pageNumber: number | null;
    pages: number | null;
    tags: Array<string | null> | null;
    queue_pos: number | null;
    startDate: string | null;
    goalFinishDate: string | null;
    finishDate: string | null;
    rating: number | null;
    sessions: Array<{
      __typename: "Session";
      date: string | null;
      startPage: number | null;
      endPage: number | null;
    } | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateBookSubscription = {
  __typename: "Book";
  id: string;
  title: string;
  author: string;
  status: number;
  description: string | null;
  pageNumber: number | null;
  pages: number | null;
  tags: Array<string | null> | null;
  queue_pos: number | null;
  startDate: string | null;
  goalFinishDate: string | null;
  finishDate: string | null;
  rating: number | null;
  sessions: Array<{
    __typename: "Session";
    date: string | null;
    startPage: number | null;
    endPage: number | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateBookSubscription = {
  __typename: "Book";
  id: string;
  title: string;
  author: string;
  status: number;
  description: string | null;
  pageNumber: number | null;
  pages: number | null;
  tags: Array<string | null> | null;
  queue_pos: number | null;
  startDate: string | null;
  goalFinishDate: string | null;
  finishDate: string | null;
  rating: number | null;
  sessions: Array<{
    __typename: "Session";
    date: string | null;
    startPage: number | null;
    endPage: number | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteBookSubscription = {
  __typename: "Book";
  id: string;
  title: string;
  author: string;
  status: number;
  description: string | null;
  pageNumber: number | null;
  pages: number | null;
  tags: Array<string | null> | null;
  queue_pos: number | null;
  startDate: string | null;
  goalFinishDate: string | null;
  finishDate: string | null;
  rating: number | null;
  sessions: Array<{
    __typename: "Session";
    date: string | null;
    startPage: number | null;
    endPage: number | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateBook(
    input: CreateBookInput,
    condition?: ModelBookConditionInput
  ): Promise<CreateBookMutation> {
    const statement = `mutation CreateBook($input: CreateBookInput!, $condition: ModelBookConditionInput) {
        createBook(input: $input, condition: $condition) {
          __typename
          id
          title
          author
          status
          description
          pageNumber
          pages
          tags
          queue_pos
          startDate
          goalFinishDate
          finishDate
          rating
          sessions {
            __typename
            date
            startPage
            endPage
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateBookMutation>response.data.createBook;
  }
  async UpdateBook(
    input: UpdateBookInput,
    condition?: ModelBookConditionInput
  ): Promise<UpdateBookMutation> {
    const statement = `mutation UpdateBook($input: UpdateBookInput!, $condition: ModelBookConditionInput) {
        updateBook(input: $input, condition: $condition) {
          __typename
          id
          title
          author
          status
          description
          pageNumber
          pages
          tags
          queue_pos
          startDate
          goalFinishDate
          finishDate
          rating
          sessions {
            __typename
            date
            startPage
            endPage
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateBookMutation>response.data.updateBook;
  }
  async DeleteBook(
    input: DeleteBookInput,
    condition?: ModelBookConditionInput
  ): Promise<DeleteBookMutation> {
    const statement = `mutation DeleteBook($input: DeleteBookInput!, $condition: ModelBookConditionInput) {
        deleteBook(input: $input, condition: $condition) {
          __typename
          id
          title
          author
          status
          description
          pageNumber
          pages
          tags
          queue_pos
          startDate
          goalFinishDate
          finishDate
          rating
          sessions {
            __typename
            date
            startPage
            endPage
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteBookMutation>response.data.deleteBook;
  }
  async GetBook(id: string): Promise<GetBookQuery> {
    const statement = `query GetBook($id: ID!) {
        getBook(id: $id) {
          __typename
          id
          title
          author
          status
          description
          pageNumber
          pages
          tags
          queue_pos
          startDate
          goalFinishDate
          finishDate
          rating
          sessions {
            __typename
            date
            startPage
            endPage
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetBookQuery>response.data.getBook;
  }
  async ListBooks(
    filter?: ModelBookFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListBooksQuery> {
    const statement = `query ListBooks($filter: ModelBookFilterInput, $limit: Int, $nextToken: String) {
        listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            title
            author
            status
            description
            pageNumber
            pages
            tags
            queue_pos
            startDate
            goalFinishDate
            finishDate
            rating
            sessions {
              __typename
              date
              startPage
              endPage
            }
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListBooksQuery>response.data.listBooks;
  }
  OnCreateBookListener: Observable<
    SubscriptionResponse<OnCreateBookSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateBook {
        onCreateBook {
          __typename
          id
          title
          author
          status
          description
          pageNumber
          pages
          tags
          queue_pos
          startDate
          goalFinishDate
          finishDate
          rating
          sessions {
            __typename
            date
            startPage
            endPage
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateBookSubscription>>;

  OnUpdateBookListener: Observable<
    SubscriptionResponse<OnUpdateBookSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateBook {
        onUpdateBook {
          __typename
          id
          title
          author
          status
          description
          pageNumber
          pages
          tags
          queue_pos
          startDate
          goalFinishDate
          finishDate
          rating
          sessions {
            __typename
            date
            startPage
            endPage
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateBookSubscription>>;

  OnDeleteBookListener: Observable<
    SubscriptionResponse<OnDeleteBookSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteBook {
        onDeleteBook {
          __typename
          id
          title
          author
          status
          description
          pageNumber
          pages
          tags
          queue_pos
          startDate
          goalFinishDate
          finishDate
          rating
          sessions {
            __typename
            date
            startPage
            endPage
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteBookSubscription>>;
}
