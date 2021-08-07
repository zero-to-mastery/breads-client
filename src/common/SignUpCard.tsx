import React from "react";

const SignUpCard: React.FunctionComponent = () => {
  return (
    <div className="card-demo pb-1">
      <div className="card">
        <div className="card__header">
          <span role="img" aria-label="bread">
            🍞{" "}
          </span>
          <strong>Welcome to BREADS</strong>
          <span role="img" aria-label="bread">
            {" "}
            🍞
          </span>
        </div>
        <div className="card__body">
          <p>Keep track of what you read online</p>
        </div>
        <div className="card__footer">
          <p>
            Sign up above
            <span role="img" aria-label="up-arrow">
              {" "}
              ⬆️
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;
