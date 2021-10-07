import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import UserImage from "../../../common/UserImage";
// import Summary from '../../summary/Summary';
import Favorites from "./Favorites";
import Delete from "./Delete";
import Update from "./Update";
import Tags from "./Tags";
import { getReadingById } from "../selectors";
import BreadsImage from "../../../images/breads-wesual-click.jpg";
import { RootState } from "../../rootReducer";

type OwnProps = {
  id: any;
  style: any;
  list: any;
  outdated: any;
  measure: any;
  isCorrectUser?: any;
};

type ListItemProps = PropsFromRedux & OwnProps;

const ListItem: React.FunctionComponent<ListItemProps> = ({
  id,
  style,
  isCorrectUser,
  list,
  users,
  reading,
  summary,
  currentUser,
  outdated,
  tags,
  measure,
}) => {
  const minutes = Math.round(reading.word_count / 300);

  function addImageTransformation(image: any): string | undefined {
    let imageURL = new URL(image);
    let pathnameArray = imageURL.pathname.split("/");
    let originalPathnameArray = pathnameArray.slice();
    for (let i = 0; i < originalPathnameArray.length; i++) {
      if (pathnameArray[i] === "upload") {
        pathnameArray.splice(i + 1, 0, "w_96,h_96,c_fill,g_face");
        imageURL.pathname = pathnameArray.join("/");
        return imageURL.href;
      }
    }
  }

  function serveImageThroughCDN(): string {
    let image = getImageDimensions();
    if (reading && reading.reading_image) {
      return `https://images.weserv.nl/?url=${reading.reading_image}&w=${image.width}&h=${image.height}&fit=cover&output=webp`;
    } else {
      return BreadsImage;
    }
  }

  function getImageDimensions(): { width: number; height: number } {
    if (window.innerWidth >= 997) {
      return {
        width: 550,
        height: 300,
      };
    } else {
      return {
        width: 320,
        height: 175,
      };
    }
  }

  let newUserImage = addImageTransformation(users[reading.reader].image);
  let newReadingImage = serveImageThroughCDN();

  return (
    <div className="pb-1" style={{ ...style }}>
      <div className="card-demo-md">
        <div className="card">
          <div className="card__header">
            {!isCorrectUser && (
              <UserImage
                image={newUserImage}
                username={users[reading.reader].username}
                imageSize=""
              >
                <div className="avatar__intro">
                  <h4 className="avatar__name">
                    <Link to={`/${users[reading.reader].id}`}>
                      {users[reading.reader].username}
                    </Link>
                  </h4>
                  <small className="avatar__subtitle overflow-auto-horizontal">
                    <Moment fromNow ago>
                      {reading.created_at}
                    </Moment>
                    <span> </span>
                    {tags && <Tags reading={reading} tags={tags} list={list} />}
                  </small>
                </div>
              </UserImage>
            )}
          </div>
          <div className="card__image">
            <img
              loading="lazy"
              src={newReadingImage}
              onError={imageOnErrorHandler}
              onLoad={measure}
              // alt='Article'
            ></img>
          </div>
          <div className="card__body">
            <a
              href={`${reading.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{reading.title}</h3>
            </a>
            <p>{reading.description}</p>
          </div>
          <div className="card__footer">
            <p className="row row--justify-between px-1">
              <span>{reading.domain}</span>
              <span>{minutes > 0 && `${minutes} min read`}</span>
            </p>
            {list !== "global" && list !== "subscriptions" && (
              <div className="button-group button-group--block">
                {(currentUser.user?.id === reading.reader ||
                  currentUser.user?.id === 1) &&
                  outdated === "true" && (
                    <Update
                      user_id={reading.reader}
                      reading_id={id}
                      url={reading.url}
                    />
                  )}
                <Favorites
                  id={id}
                  reader={reading.reader}
                  favorite={reading.favorite}
                />
                <Delete id={id} reader={reading.reader} />
              </div>
            )}
            {/* {summary?.id === reading?.id &&
                        <p className='summary-data'>{summary.data}</p>
                    } */}
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    users: state.user,
    reading: getReadingById(state, ownProps.list, ownProps.id),
    currentUser: state.currentUser,
    summary: state.summary,
    tags: state.tags,
  };
}

const connector = connect(mapStateToProps);

//if image link is broken during loading the component do not show broken link or placeholder.
const imageOnErrorHandler = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = "";
};

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ListItem);
