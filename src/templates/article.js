import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import placeholder from "../assets/images/placeholder.png";
import BlogWidget from "../components/BlogWidget";
import LoginModal from "../components/LoginModal";
import NotFoundSection from "../components/NotFoundSection";
import { NotificationError } from "../components/Notification";
import PaymentModal from "../components/PaymentModal";
import SEO from "../components/SEO";
import Spinner from "../components/Spinner";
import Layout from "../containers/Layout";
import { butterCMS } from "../utils/buttercmssdk";
import { useCategories, useFetch, useMenuItems } from "../utils/hooks";
import { login } from "../utils/near";
import { authorizeUser } from "../utils/store";

const ArticlePage = () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [article, setArticle] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { slug } = useParams();
  const categories = useCategories();
  const menuItems = useMenuItems();
  const { fetch, isLoading, data } = useFetch(authorizeUser);

  const account = window.walletConnection.account();

  const handleLoginClose = () => setShowLoginModal(false);
  const handleLoginShow = () => setShowLoginModal(true);

  const handlePaymentShow = () => {
    setShowPaymentModal(true);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const article = await butterCMS.post.retrieve(slug);
        setArticle(article.data.data);
      } catch (error) {
        toast(<NotificationError text="Operation unsuccessfull" />);
        setError(true);
      }
      setLoader(false);
    };

    loadData();
  }, [slug]);

  useEffect(() => {
    if (article) {
      if (!account.accountId) {
        handleLoginShow();
      } else {
        fetch(article.slug);
      }
    }
  }, [article]);

  const showContent = () => {
    if (!account.accountId) {
      return (
        <p style={{ marginTop: "15px" }}>
          To read the article you must first
          <Button
            variant="link"
            onClick={() => {
              login();
            }}
          >
            Login
          </Button>
        </p>
      );
    }
    if (isLoading) {
      return <h5 style={{ marginTop: "15px" }}>loading...</h5>;
    }
    if (data) {
      return (
        <div
          className="single-post-body"
          dangerouslySetInnerHTML={{
            __html: article.body,
          }}
        ></div>
      );
    } else {
      return (
        <div style={{ position: "relative" }}>
          <div
            className="single-post-body"
            dangerouslySetInnerHTML={{
              __html: article.body.slice(0, 1000) + "...",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              width: "100%",
              height: "200px",
              display: "flex",
              justifyContent: "end",
              flexDirection: "column",
              alignItems: "center",
              background:
                "linear-gradient(0deg,white,rgba(255,255,255,0.7), transparent)",
            }}
          >
            <div>Read the article for 1 NEAR</div>
            <Button variant="primary" onClick={handlePaymentShow}>
              Pay
            </Button>
          </div>
        </div>
      );
    }
  };

  if (error) return <NotFoundSection />;
  if (loader) return <Spinner />;

  return (
    <Layout menuItems={menuItems}>
      <SEO
        title={article.title}
        description={article.meta_description}
        image={article.featured_image}
      />

      <section id="blog-header" className="single-post-nav">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h2>{article.title}</h2>
                <ul className="breadcrumb-nav">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>{article.title}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-post">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-12 col-12">
              <div className="single-post">
                <div className="single-post-meta">
                  <h2 className="single-post-header">{article.title}</h2>
                  <ul className="single-post-meta-info">
                    <li>
                      <a href="#">
                        <img
                          src={article.author.profile_image || placeholder}
                          alt="#"
                        />{" "}
                        {article.author.first_name} {article.author.last_name}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="lni lni-calendar"></i>{" "}
                        {new Date(article.published).toLocaleString()}
                      </a>
                    </li>
                    <li>
                      {article.tags.map((tag) => {
                        return (
                          <Link key={tag.slug} to={`/blog/tag/${tag.slug}`}>
                            <i className="lni lni-tag"></i> {tag.name}{" "}
                          </Link>
                        );
                      })}
                    </li>
                  </ul>
                </div>

                {article.featured_image && (
                  <div className="single-post-thumbnail">
                    <img
                      src={article.featured_image}
                      alt={article.featured_image_alt}
                    />
                  </div>
                )}

                {showContent()}
              </div>
            </div>

            {/* <!-- Searchbox --> */}
            <aside className="col-lg-4 col-md-12 col-12">
              <BlogWidget categories={categories} />
            </aside>
          </div>
        </div>
        <LoginModal
          show={showLoginModal}
          onClose={() => {
            handleLoginClose();
          }}
        />
        <PaymentModal
          postSlug={article.slug}
          postAuthor={article.author.first_name}
          show={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
          }}
        />
      </section>
    </Layout>
  );
};

export default ArticlePage;
