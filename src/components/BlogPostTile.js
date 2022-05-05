import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import { Button } from "react-bootstrap";

const BlogPostTile = (props) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const account = window.walletConnection.account();

  const handleLoginClose = () => setShowLoginModal(false);
  const handleLoginShow = () => setShowLoginModal(true);

  const onReadMoreClicked = (post) => {
    if (!account.accountId) {
      handleLoginShow();
    } else {
      navigate(`/blog/${post.slug}`);
    }
  };
  return (
    <div className="col-lg-4 col-md-8 col-sm-10">
      <div className="single-blog">
        {props.featured_image && (
          <div className="blog-header">
            <img
              className="img-fluid"
              loading="lazy"
              src={props.featured_image}
              alt={props.featured_image_alt}
            />
          </div>
        )}
        <div className="blog-body">
          <h5 className="package-name">
            <Link to={`/blog/${props.slug}`}>{props.title}</Link>
          </h5>
          <p>{props.summary}</p>
        </div>
        <div className="blog-footer">
          <Button
            variant="outline-primary"
            onClick={() => {
              onReadMoreClicked(props);
            }}
          >
            <div>
              <div>Read More</div>
            </div>
          </Button>
        </div>
      </div>
      <LoginModal
        show={showLoginModal}
        onClose={() => {
          handleLoginClose();
        }}
      />
    </div>
  );
};

export default BlogPostTile;
