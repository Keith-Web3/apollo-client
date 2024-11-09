import { gql } from "@apollo/client";
import type { TypedDocoumentNode } from "@apollo/client";

export const ProfileFieldsFragment: TypedDocoumentNode<{
  profile: { id: string; avatarUrl: string };
}> = gql`
  fragment ProfileFields on User {
    profile {
      id
      avatarUrl
    }
  }
`;

const CurrentUserFieldsFragment = gql`
  fragment CurrentUserFields on User {
    name
    ...ProfileFields
  }
`;

export const GetCurrentUser = gql`
  query GetCurrentUser {
    currentUser {
      id
      ...CurrentUserFields
    }
  }

  ${CurrentUserFieldsFragment}
`;
