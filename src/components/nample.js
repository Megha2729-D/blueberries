"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import logo from "@/images/blueberry-logo-Photoroom.png";

import { X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { cartCount } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  /* SEARCH POPUP */
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  const searchPopupRef = useRef(null);

  /* =========================
     SEARCH PLACEHOLDER SLIDER
  ========================= */

  const placeholders = [
    'Search "PINK SHIRTS"',
    'Search "POLO SHIRTS"',
    'Search "LINEN SHIRTS"',
    'Search "WHITE SHIRTS"',
  ];

  const [activePlaceholder, setActivePlaceholder] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.length > 0) return;

    const interval = setInterval(() => {
      setActivePlaceholder((prev) =>
        prev === placeholders.length - 1 ? 0 : prev + 1
      );
    }, 2200);

    return () => clearInterval(interval);
  }, [searchValue]);

  /* CLOSE SEARCH POPUP OUTSIDE CLICK */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchPopupRef.current &&
        !searchPopupRef.current.contains(event.target)
      ) {
        setShowSearchPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================
     SCROLL
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}

      <div className="desktop-header">
        <div className="header-sticky">
          <div className="header-inner">

            {/* LEFT */}
            <span className="menu-toggle">
              ☰
            </span>

            <div className="header-space"></div>

            {/* LOGO */}
            <div className="logo-wrapper">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Blueberries Logo"
                  className="logo-image"
                  priority
                />
              </Link>
            </div>

            {/* RIGHT */}
            <div className="header-right">

              {/* SEARCH */}
              <div
                className="search-wrapper"
                ref={searchPopupRef}
              >
                <div
                  className="search-box"
                  onClick={() => setShowSearchPopup(true)}
                >
                  <div className="search-icon">
                    🔍
                  </div>

                  <input
                    type="text"
                    className="search-input"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />

                  {searchValue === "" && (
                    <div className="search-placeholder">
                      <div
                        className="placeholder-slider"
                        style={{
                          transform: `translateY(-${activePlaceholder * 24
                            }px)`,
                        }}
                      >
                        {placeholders.map((item, index) => (
                          <div className="placeholder-item" key={index}>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* SEARCH POPUP */}

                <div
                  className={`search-popup ${showSearchPopup ? "active" : ""
                    }`}
                >

                  {/* TOP SEARCHES */}

                  <div className="search-section">
                    <h3 className="section-title">
                      Top Searches
                    </h3>

                    <div className="chip-wrapper">
                      {[
                        "POLO SHIRTS",
                        "LINEN SHIRTS",
                        "WHITE SHIRTS",
                        "BLACK SHIRTS",
                        "FORMAL SHIRTS",
                        "BAGGY JEANS",
                      ].map((item, index) => (
                        <div className="search-chip" key={index}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TRENDING */}

                  <div className="search-section">
                    <h3 className="section-title">
                      Trending
                    </h3>

                    <div className="chip-wrapper">
                      {[
                        "All",
                        "Shirts",
                        "T-Shirts",
                        "Jeans",
                        "Cargo Pants",
                        "Shoes",
                      ].map((item, index) => (
                        <div
                          className={`search-chip ${index === 0 ? "active-chip" : ""
                            }`}
                          key={index}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PRODUCTS */}

                  <div className="search-products">

                    {[1, 2, 3, 4].map((item) => (
                      <div className="product-card" key={item}>
                        <div className="product-image-wrapper">
                          <img
                            src="https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_7e454c60-a9aa-40e9-817d-d553b1424652.jpg?v=1775232197&quality=80"
                            alt=""
                            className="product-image"
                          />
                        </div>

                        <div className="product-content">
                          <h4>
                            Navy Cotton Linen Shirt
                          </h4>

                          <p>
                            ₹1599
                          </p>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>

              {/* CART */}

              <Link href="/checkout/cart" className="cart-btn">
                Cart ({cartCount})
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* STYLES */}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .desktop-header {
          width: 100%;
          background: #fff;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
          z-index: 999;
        }

        .header-inner {
          height: 70px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .header-space {
          flex: 1;
        }

        .logo-image {
          width: 120px;
          height: auto;
          object-fit: contain;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
        }

        /* SEARCH */

        .search-wrapper {
          position: relative;
          width: 320px;
        }

        .search-box {
          height: 44px;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          padding: 0 14px;
          border-radius: 6px;
          cursor: text;
          background: #fff;
          position: relative;
        }

        .search-icon {
          margin-right: 10px;
          font-size: 16px;
        }

        .search-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 14px;
          background: transparent;
        }

        .search-placeholder {
          position: absolute;
          left: 42px;
          top: 10px;
          overflow: hidden;
          height: 24px;
          pointer-events: none;
        }

        .placeholder-slider {
          transition: 0.4s ease;
        }

        .placeholder-item {
          height: 24px;
          display: flex;
          align-items: center;
          color: #777;
          font-size: 14px;
        }

        /* SEARCH POPUP */

        .search-popup {
          position: absolute;
          top: 60px;
          left: 0;
          width: 700px;
          max-height: 80vh;
          overflow-y: auto;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: 0.3s ease;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          z-index: 999;
        }

        .search-popup.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .search-section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .chip-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .search-chip {
          border: 1px solid #000;
          padding: 8px 14px;
          font-size: 12px;
          cursor: pointer;
          transition: 0.3s;
        }

        .search-chip:hover {
          background: #000;
          color: #fff;
        }

        .active-chip {
          background: #000;
          color: #fff;
        }

        /* PRODUCTS */

        .search-products {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .product-card {
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
          cursor: pointer;
        }

        .product-image-wrapper {
          width: 100%;
          height: 320px;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.4s;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-content {
          padding: 10px;
        }

        .product-content h4 {
          font-size: 14px;
          margin: 0 0 6px;
          font-weight: 500;
        }

        .product-content p {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }

        /* CART */

        .cart-btn {
          text-decoration: none;
          color: #000;
          font-size: 14px;
        }

        /* MOBILE */

        @media (max-width: 768px) {

          .search-wrapper {
            width: 100%;
          }

          .search-popup {
            width: 100vw;
            left: -20px;
            border-radius: 0;
            top: 55px;
            max-height: calc(100vh - 55px);
          }

          .search-products {
            grid-template-columns: repeat(2, 1fr);
          }

          .product-image-wrapper {
            height: 220px;
          }
        }
      `}</style>
    </>
  );
}