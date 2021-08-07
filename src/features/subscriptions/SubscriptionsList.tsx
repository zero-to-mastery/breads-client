import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchSubscriptions, removeSubscription } from "./actions";
import List from "../../common/List";
import ListCard from "../../common/ListCard";
import { getSubscriptions } from "./selectors";
import { RootState } from "../rootReducer";
import { match } from "react-router";

type SubscriptionProps = PropsFromRedux & OwnProps;

interface OwnProps {
  match: match<any>;
  sub_type: "following" | "followers";
}

class SubscriptionsList extends Component<SubscriptionProps> {
  render() {
    const { friends, removeSubscription, currentUser, match, sub_type } =
      this.props;
    let subscriptionsList: JSX.Element[] = [];
    if (friends) {
      subscriptionsList = friends[sub_type].map((id: number) => (
        <ListCard
          // refactor like listitem
          key={id}
          id={id}
          removeSubscription={
            currentUser && removeSubscription.bind(this, currentUser, id)
          }
          subscribed={
            `${currentUser}` === match.params.id && sub_type !== "followers"
          }
        />
      ));
    }
    return <List list_data={subscriptionsList} display="card-columns" />;
  }
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    friends: getSubscriptions(state, ownProps.match.params.id),
    currentUser: state.currentUser.user.id,
  };
}

const connector = connect(mapStateToProps, {
  fetchSubscriptions,
  removeSubscription,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SubscriptionsList);
