const EntryCard = ({
    author,
    published_at,
    title,
    link,
}) => {
    return (
        <div className="rss-feed">
            <article className="feed-item">
                <a href={link} className="feed-title">{title}</a>
                <div className="feed-meta">
                    <span className="feed-date">
                        <span>Published:</span> {published_at}
                    </span>
                </div>
                <div className="feed-source">
                    {author}
                </div>
            </article>
        </div>
    );
};

export default EntryCard;