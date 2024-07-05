const ProfilePage = `<div class="grid">
            <main class="posts">
                <article class="post post_active">
                    <img src="assets/himalayan-sunset.webp" alt="Beautiful sunset">
                    <div class="comments">
                        <div class="comment">
                            <div class="comment__header">
                                <div class="icon-wrapper"><img src="assets/icons/quote-icon.svg" alt=""></div>
                                <p><a class="comment__author" href="#">James Anderson</a> commented:</p>
                            </div>
                            <div class="comment__body">
                                <p class="comment__content">Don’t sit and wait. Get out there, feel life. Touch the
                                    sun, and immerse in the sea. Keep love in your heart. A life without it is like
                                    a sunless garden when the flowers are dead. Because summer is passion, memories,
                                    light breeze, the sun that appears on the skin and caresses the face.
                                </p>
                                <p class="comment__data">– Jason, <time class="comment__time" datetime="10:30">10:30
                                        am</time>
                                </p>
                            </div>
                        </div>
                    </div>
                    <footer class="post__footer">
                        <ul class="post__stats">
                            <li class="post__stat">
                                <div class="icon-wrapper"><img class="post__stat-logo"
                                        src="assets/icons/views-icon.svg" alt="views"></div>
                                <span class="post__stat-data" aria-label="views">432</span>
                            </li>
                            <li class="post__stat">
                                <div class="icon-wrapper"><img class="post__stat-logo"
                                        src="assets/icons/quote-icon.svg" alt="comments"></div>
                                <span class="post__stat-data" aria-label="comments">47</span>
                            </li>
                        </ul>
                    </footer>
                </article>
                <article class="post">
                    <header class="post__header">
                        <div class="left-container">
                            <p class="post__header-text">Sunset sunset sunset</p>
                        </div>
                        <div class="right-container">
                            <div class="header__stats">
                                <div class="icon-wrapper"><img src="assets/icons/time-icon.svg" alt="posted"></div>
                                <time datetime="PT53M">53 minutes ago</time>
                            </div>
                            <div class="icon-wrapper">
                                <img class="menu-arrow-icon" src="assets/icons/menu-arrow-icon.svg" alt="">
                            </div>
                        </div>
                    </header>
                </article>
                <article class="post">
                    <header class="post__header">
                        <div class="left-container">
                            <p class="post__header-text">Morning in Siberia</p>
                        </div>
                        <div class="right-container">
                            <div class="header__stats">
                                <div class="icon-wrapper"><img src="assets/icons/time-icon.svg" alt="posted"></div>
                                <time datetime="PT56M">56 minutes ago</time>
                            </div>
                            <div class="icon-wrapper">
                                <img class="menu-arrow-icon" src="assets/icons/menu-arrow-icon.svg" alt="">
                            </div>
                        </div>
                    </header>
                </article>
            </main>

            <aside class="profile-sidebar">
                <div class="sidebar-card sidebar-card_user">
                    <div class="sidebar-card__photo-container">
                        <img class="sidebar-card__photo" src="assets/profile-photo.webp" alt="Hanna Dorman">
                    </div>
                    <div class="sidebar-card__user-title">
                        <h3 class="sidebar-card__user-name">Hanna Dorman</h3>
                        <p class="sidebar-card__user-profession">UX/UI designer</p>
                    </div>
                    <ul class="user-social-media">
                        <li><a href="https://www.telegram.org"><img src="assets/icons/telegram.svg" alt="Hanna's telegram"></a></li>
                        <li><a href="https://www.hh.ru"><img src="assets/icons/hh.svg" alt="Hanna's headhunters"></a></li>
                        <li><a href="https://www.twitter.com"><img src="assets/icons/twitter.svg" alt="Hanna's twitter"></a></li>
                    </ul>
                </div>
                <div class="sidebar-card open">
                    <div class="sidebar-card__header">
                        <h3 class="sidebar-card__title">Navigation</h3>
                        <div class="icon-wrapper icon-wrapper_sm">
                            <img class="menu-arrow-icon" src="assets/icons/menu-arrow-icon.svg" alt="">
                        </div>
                    </div>
                    <div class="sidebar-card__content">
                        <nav class="sidebar-card__nav">
                            <ul class="sidebar-card__list">
                                <li class="sidebar-card__item">
                                    <a href="#" class="sidebar-card__link">
                                        <div class="sidebar-card__link-text">
                                            <div class="icon-wrapper"><img src="assets/icons/person-icon.svg" alt=""></div>
                                            <span class="sidebar-card__link-title">My profile</span>
                                        </div>
                                        <div class="badge"></div>
                                    </a>
                                </li>
                                <li class="sidebar-card__item">
                                    <a href="#" class="sidebar-card__link">
                                        <div class="sidebar-card__link-text">
                                            <div class="icon-wrapper"><img src="assets/icons/balance-icon.svg" alt=""></div>
                                            <span class="sidebar-card__link-title">Balance</span>
                                        </div>
                                        <div class="badge badge_text">$ 1,430</div>
                                    </a>
                                </li>
                                <li class="sidebar-card__item">
                                    <a href="#" class="sidebar-card__link">
                                        <div class="sidebar-card__link-text">
                                            <div class="icon-wrapper"><img src="assets/icons/connections-icon.svg" alt="">
                                            </div>
                                            <span class="sidebar-card__link-title">Connections</span>
                                        </div>
                                        <div class="badge badge_red">29</div>
                                    </a>
                                </li>
                                <li class="sidebar-card__item">
                                    <a href="#" class="sidebar-card__link">
                                        <div class="sidebar-card__link-text">
                                            <div class="icon-wrapper"><img src="assets/icons/people-icon.svg" alt=""></div>
                                            <span class="sidebar-card__link-title">Friends</span>
                                        </div>
                                        <div class="badge"></div>
                                    </a>
                                </li>
                                <div class="sidebar-card__separetor"></div>
                                <li class="sidebar-card__item">
                                    <a href="#" class="sidebar-card__link">
                                        <div class="sidebar-card__link-text">
                                            <div class="icon-wrapper"><img src="assets/icons/events-icon.svg" alt=""></div>
                                            <span class="sidebar-card__link-title">Events</span>
                                        </div>
                                        <div class="badge badge_green">45</div>
                                    </a>
                                </li>
                                <li class="sidebar-card__item">
                                    <a href="#" class="sidebar-card__link">
                                        <div class="sidebar-card__link-text">
                                            <div class="icon-wrapper"><img src="assets/icons/settings-icon.svg" alt=""></div>
                                            <span class="sidebar-card__link-title">Account settings</span>
                                        </div>
                                        <div class="badge"></div>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="sidebar-card open">
                    <div class="sidebar-card__header">
                        <h3 class="sidebar-card__title">Share your thoughts</h3>
                        <div class="icon-wrapper icon-wrapper_sm">
                            <img class="menu-arrow-icon" src="assets/icons/menu-arrow-icon.svg" alt="">
                        </div>
                    </div>
                    <div class="sidebar-card__content">
                        <div>
                            <div class="sidebar-card__content-container">
                                <textarea class="sidebar-card__textarea" placeholder="Enter your message..."
                                    rows="4"></textarea>
                                <button class="sidebar-card__button">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>`;

export default ProfilePage;
