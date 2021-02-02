/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateSessionInput = {
  id?: string | null;
  date?: string | null;
  startPage?: number | null;
  endPage?: number | null;
};

export type ModelSessionConditionInput = {
  date?: ModelStringInput | null;
  startPage?: ModelIntInput | null;
  endPage?: ModelIntInput | null;
  and?: Array<ModelSessionConditionInput | null> | null;
  or?: Array<ModelSessionConditionInput | null> | null;
  not?: ModelSessionConditionInput | null;
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

export type UpdateSessionInput = {
  id: string;
  date?: string | null;
  startPage?: number | null;
  endPage?: number | null;
};

export type DeleteSessionInput = {
  id?: string | null;
};

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
  finishDate?: string | null;
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
  finishDate?: ModelStringInput | null;
  and?: Array<ModelBookConditionInput | null> | null;
  or?: Array<ModelBookConditionInput | null> | null;
  not?: ModelBookConditionInput | null;
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
  finishDate?: string | null;
};

export type DeleteBookInput = {
  id?: string | null;
};

export type ModelSessionFilterInput = {
  id?: ModelIDInput | null;
  date?: ModelStringInput | null;
  startPage?: ModelIntInput | null;
  endPage?: ModelIntInput | null;
  and?: Array<ModelSessionFilterInput | null> | null;
  or?: Array<ModelSessionFilterInput | null> | null;
  not?: ModelSessionFilterInput | null;
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
  finishDate?: ModelStringInput | null;
  and?: Array<ModelBookFilterInput | null> | null;
  or?: Array<ModelBookFilterInput | null> | null;
  not?: ModelBookFilterInput | null;
};

export type CreateSessionMutation = {
  __typename: "Session";
  id: string;
  date: string | null;
  startPage: number | null;
  endPage: number | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateSessionMutation = {
  __typename: "Session";
  id: string;
  date: string | null;
  startPage: number | null;
  endPage: number | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteSessionMutation = {
  __typename: "Session";
  id: string;
  date: string | null;
  startPage: number | null;
  endPage: number | null;
  createdAt: string;
  updatedAt: string;
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
  finishDate: string | null;
  sessions: Array<{
    __typename: "Session";
    id: string;
    date: string | null;
    startPage: number | null;
    endPage: number | null;
    createdAt: string;
    updatedAt: string;
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
  finishDate: string | null;
  sessions: Array<{
    __typename: "Session";
    id: string;
    date: string | null;
    startPage: number | null;
    endPage: number | null;
    createdAt: string;
    updatedAt: string;
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
  finishDate: string | null;
  sessions: Array<{
    __typename: "Session";
    id: string;
    date: string | null;
    startPage: number | null;
    endPage: number | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type GetSessionQuery = {
  __typename: "Session";
  id: string;
  date: string | null;
  startPage: number | null;
  endPage: number | null;
  createdAt: string;
  updatedAt: string;
};

export type ListSessionsQuery = {
  __typename: "ModelSessionConnection";
  items: Array<{
    __typename: "Session";
    id: string;
    date: string | null;
    startPage: number | null;
    endPage: number | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
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
  finishDate: string | null;
  sessions: Array<{
    __typename: "Session";
    id: string;
    date: string | null;
    startPage: number | null;
    endPage: number | null;
    createdAt: string;
    updatedAt: string;
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
    finishDate: string | null;
    sessions: Array<{
      __typename: "Session";
      id: string;
      date: string | null;
      startPage: number | null;
      endPage: number | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateSessionSubscription = {
  __typename: "Session";
  id: string;
  date: string | null;
  startPage: number | null;
  endPage: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateSessionSubscription = {
  __typename: "Session";
  id: string;
  date: string | null;
  startPage: number | null;
  endPage: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteSessionSubscription = {
  __typename: "Session";
  id: string;
  date: string | null;
  startPage: number | null;
  endPage: number | null;
  createdAt: string;
  updatedAt: string;
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
  finishDate: string | null;
  sessions: Array<{
    __typename: "Session";
    id: string;
    date: string | null;
    startPage: number | null;
    endPage: number | null;
    createdAt: string;
    updatedAt: string;
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
  finishDate: string | null;
  sessions: Array<{
    __typename: "Session";
    id: string;
    date: string | null;
    startPage: number | null;
    endPage: number | null;
    createdAt: string;
    updatedAt: string;
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
  finishDate: string | null;
  sessions: Array<{
    __typename: "Session";
    id: string;
    date: string | null;
    startPage: number | null;
    endPage: number | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateSession(
    input: CreateSessionInput,
    condition?: ModelSessionConditionInput
  ): Promise<CreateSessionMutation> {
    const statement = `mutation CreateSession($input: CreateSessionInput!, $condition: ModelSessionConditionInput) {
        createSession(input: $input, condition: $condition) {
          __typename
          id
          date
          startPage
          endPage
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
    return <CreateSessionMutation>response.data.createSession;
  }
  async UpdateSession(
    input: UpdateSessionInput,
    condition?: ModelSessionConditionInput
  ): Promise<UpdateSessionMutation> {
    const statement = `mutation UpdateSession($input: UpdateSessionInput!, $condition: ModelSessionConditionInput) {
        updateSession(input: $input, condition: $condition) {
          __typename
          id
          date
          startPage
          endPage
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
    return <UpdateSessionMutation>response.data.updateSession;
  }
  async DeleteSession(
    input: DeleteSessionInput,
    condition?: ModelSessionConditionInput
  ): Promise<DeleteSessionMutation> {
    const statement = `mutation DeleteSession($input: DeleteSessionInput!, $condition: ModelSessionConditionInput) {
        deleteSession(input: $input, condition: $condition) {
          __typename
          id
          date
          startPage
          endPage
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
    return <DeleteSessionMutation>response.data.deleteSession;
  }
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
          finishDate
          sessions {
            __typename
            id
            date
            startPage
            endPage
            createdAt
            updatedAt
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
          finishDate
          sessions {
            __typename
            id
            date
            startPage
            endPage
            createdAt
            updatedAt
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
          finishDate
          sessions {
            __typename
            id
            date
            startPage
            endPage
            createdAt
            updatedAt
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
  async GetSession(id: string): Promise<GetSessionQuery> {
    const statement = `query GetSession($id: ID!) {
        getSession(id: $id) {
          __typename
          id
          date
          startPage
          endPage
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
    return <GetSessionQuery>response.data.getSession;
  }
  async ListSessions(
    filter?: ModelSessionFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListSessionsQuery> {
    const statement = `query ListSessions($filter: ModelSessionFilterInput, $limit: Int, $nextToken: String) {
        listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            date
            startPage
            endPage
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
    return <ListSessionsQuery>response.data.listSessions;
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
          finishDate
          sessions {
            __typename
            id
            date
            startPage
            endPage
            createdAt
            updatedAt
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
            finishDate
            sessions {
              __typename
              id
              date
              startPage
              endPage
              createdAt
              updatedAt
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
  OnCreateSessionListener: Observable<
    SubscriptionResponse<OnCreateSessionSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateSession {
        onCreateSession {
          __typename
          id
          date
          startPage
          endPage
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateSessionSubscription>>;

  OnUpdateSessionListener: Observable<
    SubscriptionResponse<OnUpdateSessionSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateSession {
        onUpdateSession {
          __typename
          id
          date
          startPage
          endPage
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateSessionSubscription>>;

  OnDeleteSessionListener: Observable<
    SubscriptionResponse<OnDeleteSessionSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteSession {
        onDeleteSession {
          __typename
          id
          date
          startPage
          endPage
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteSessionSubscription>>;

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
          finishDate
          sessions {
            __typename
            id
            date
            startPage
            endPage
            createdAt
            updatedAt
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
          finishDate
          sessions {
            __typename
            id
            date
            startPage
            endPage
            createdAt
            updatedAt
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
          finishDate
          sessions {
            __typename
            id
            date
            startPage
            endPage
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteBookSubscription>>;
}
