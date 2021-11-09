import React, { Component } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import subscriptions from "../subscriptions";
import globalReadings from "../globalReadings";
import tags, { TagsAside } from "../tags";
import { fetchUserIfNeeded } from "./actions";
import { getUserById } from "./selectors";
import Card from "../../common/Card";
import Subscribe from "../../common/Subscribe";
import ReadingStats from "../../common/ReadingsStats";
import { RootState } from "../rootReducer";

const { getReadings, getWebsites, getUserReadingsInNeedOfUpdate } =
  globalReadings.selectors;
const { getFollowers, getFollowings } = subscriptions.selectors;

type UserAsideProps = PropsFromRedux & OwnProps;

interface matchProps {
  id: string;
}

interface OwnProps extends RouteComponentProps<matchProps> {
  key: number;
  id: number;
  fav: any;
}

class UserAside extends Component<UserAsideProps> {
  componentDidMount() {
    if (this.props.match) {
      this.props.fetchTagsIfNeeded(
        this.props.match.params.id,
        this.props.match.params.id
      );
      this.props.fetchUserIfNeeded(this.props.match.params.id);
      this.props.fetchSubscriptionsIfNeeded(this.props.match.params.id);
      this.props.fetchReadingsIfNeeded(
        this.props.match.params.id,
        this.props.match.params.id
      );
    } else {
      this.props.fetchSubscriptionsIfNeeded(this.props.currentUser.id);
    }
  }

  componentDidUpdate(prevProps: UserAsideProps) {
    if (
      this.props.match &&
      prevProps.match &&
      this.props.match.params.id !== prevProps.match.params.id
    ) {
      this.props.fetchTagsIfNeeded(
        this.props.match.params.id,
        this.props.match.params.id
      );
      this.props.fetchUserIfNeeded(this.props.match.params.id);
      this.props.fetchSubscriptionsIfNeeded(this.props.match.params.id);
      this.props.fetchReadingsIfNeeded(
        this.props.match.params.id,
        this.props.match.params.id
      );
    }
  }

  render() {
    let {
      readings,
      websites,
      loading,
      favorites,
      user,
      currentUser,
      outdated,
      followers,
      followings,
      match,
    } = this.props;
    let totalReadings = 0,
      totalWebsites = 0,
      topWebsite = "None",
      totalBooks = 0.0,
      totalWords = 0,
      maxReads = 0,
      totalFavorites = 0,
      totalOutdated = 0;

    let u: any = {};
    if (user) u = user;
    else u = currentUser;
    // if (!readings) u = currentUser;

    if (readings && readings.length > 0) {
      readings.forEach((r) => {
        totalWords += r.word_count / 100000;
      });

      totalReadings = readings.length;
      totalWebsites = Object.keys(websites).length;
      totalBooks = Number(totalWords.toFixed(2));

      for (const prop in websites) {
        if (websites[prop] > maxReads) {
          maxReads = websites[prop];
          topWebsite = prop;
        }
      }
    }

    if (favorites) totalFavorites = favorites.length;
    if (outdated) totalOutdated = outdated.length;
    return (
      <Card
        id={u.id}
        image={u.image}
        username={u.username}
        followings={followings}
        followers={followers}
      >
        <div className="menu__list">
          <NavLink
            exact
            to={`/${u.id}`}
            activeClassName="menu__link menu__link--active active"
            className="menu__link readings-sum"
          >
            <ReadingStats
              loading={loading}
              loading_id="userReadings"
              statName="Readings"
              stat={totalReadings}
            />
          </NavLink>
          <NavLink
            exact
            to={`/${u.id}/favorites`}
            activeClassName="menu__link menu__link--active active"
            className="menu__link favorites-sum"
          >
            <ReadingStats
              loading={loading}
              loading_id="FavoriteReadings"
              statName="Favorites"
              stat={totalFavorites}
            />
          </NavLink>
          {outdated && outdated.length > 0 && (
            <NavLink
              exact
              to={`/${u.id}/outdated`}
              activeClassName="menu__link menu__link--active active"
              className="menu__link favorites-sum"
            >
              <ReadingStats
                loading={loading}
                loading_id="OutdatedReadings"
                statName="Outdated"
                stat={totalOutdated}
              />
            </NavLink>
          )}
          <ReadingStats
            loading={loading}
            loading_id="userReadings"
            statName="Total Sites"
            stat={totalWebsites}
          />
          <ReadingStats
            loading={loading}
            loading_id="userReadings"
            statName="Top Site"
            stat={topWebsite}
          />
          <ReadingStats
            loading={loading}
            loading_id="userReadings"
            statName="Loaves"
            stat={totalBooks}
          />
        </div>
        <Subscribe user={u.id} />
        <TagsAside list={match.params.id} />
        {currentUser.id && currentUser.id === u.id && (
          <NavLink
            exact
            to={`/${u.id}/edit`}
            className="button button--sm button--block button--outline button--warning margin-top--md"
          >
            Update Account
          </NavLink>
        )}
      </Card>
    );
  }
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    readings: getReadings(state, ownProps.match.params.id),
    websites: getWebsites(state, ownProps.match.params.id),
    favorites: getReadings(state, ownProps.match.params.id, ownProps.fav),
    user: getUserById(state, ownProps.match.params.id),
    outdated: getUserReadingsInNeedOfUpdate(state, ownProps.match.params.id),
    loading: state.loading,
    currentUser: state.currentUser.user,
    followings: ownProps.match
      ? getFollowings(state, ownProps.match.params.id)
      : null,
    followers: ownProps.match
      ? getFollowers(state, ownProps.match.params.id)
      : null,
  };
}

const connector = connect(mapStateToProps, {
  ...subscriptions.actions,
  ...globalReadings.actions,
  ...tags.actions,
  fetchUserIfNeeded,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserAside);
