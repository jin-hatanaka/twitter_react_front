import { Link } from "react-router-dom";

const TweetCardWrapper = ({ children, isComment, tweet }) =>
  isComment ? (
    <div className="cursor-default">{children}</div>
  ) : (
    <div className="relative">
      <Link
        to={`/tweets/${tweet.id}`}
        className="absolute inset-0 cursor-pointer"
      ></Link>
      {children}
    </div>
  );

export default TweetCardWrapper;
