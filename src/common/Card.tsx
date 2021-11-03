import React from "react";
import { NavLink } from "react-router-dom";
import {
  Card as CardMUI,
  CardContent,
  CardHeader,
  Avatar,
  Link,
  Typography,
} from "@mui/material";
import { arrayOfIds } from "../features/subscriptions/types";

interface CardProps {
  id?: string;
  image?: string;
  username?: string;
  followings?: arrayOfIds | null;
  followers?: arrayOfIds | null;
  children: React.ReactNode;
}

const Card: React.FunctionComponent<CardProps> = ({
  id,
  image,
  username,
  followings,
  followers,
  children,
}) => {
  function addImageTransformation(image: string): string | undefined {
    let imageURL: URL = new URL(image);
    let pathnameArray: string[] = imageURL.pathname.split("/");
    let originalPathnameArray: string[] = pathnameArray.slice();

    for (let i = 0; i < originalPathnameArray.length; i++) {
      if (pathnameArray[i] === "upload") {
        pathnameArray.splice(i + 1, 0, "w_567,h_567,c_fill,g_face");
        imageURL.pathname = pathnameArray.join("/");
        return imageURL.href;
      }
    }
  }

  let updatedImage: string | undefined;
  if (image) updatedImage = addImageTransformation(image);

  return (
    <CardMUI>
      {image ? (
        <CardHeader
          avatar={
            <Avatar
              alt={username}
              src={updatedImage}
              sx={{ width: "6rem", height: "6rem" }}
            />
          }
          title={<Typography sx={{ fontWeight: 700 }}>{username}</Typography>}
          subheader={
            <div>
              <Link
                component={NavLink}
                underline="hover"
                exact
                to={`/${id}/following`}
              >
                Following: {followings ? followings.length : 0}
              </Link>
              <br />
              <Link
                component={NavLink}
                underline="hover"
                exact
                to={`/${id}/followers`}
              >
                Followers: {followers ? followers.length : 0}
              </Link>
            </div>
          }
        />
      ) : (
        <CardHeader
          disableTypography
          title={
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {username}
            </Typography>
          }
        />
      )}
      <CardContent sx={{ paddingTop: "0px" }}>{children}</CardContent>
    </CardMUI>
  );
};

export default Card;
