import React, { useState, useMemo, useRef } from 'react';
import { 
  Star, 
  CaretLeft, 
  CaretRight, 
  Rows, 
  SquaresFour, 
  MapPin, 
  CheckCircle,
  ChatCircleText,
  CaretDown,
  CaretUp
} from '@phosphor-icons/react';
import { GOOGLE_PROFILE, REVIEWS_LIST, ReviewItem } from '../data/reviewsData';

interface ReviewsSectionProps {
  id?: string;
  className?: string;
  defaultLayout?: 'carousel' | 'grid';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  id = "reviews-section", 
  className = "",
  defaultLayout = 'carousel' 
}) => {
  const [activeTopic, setActiveTopic] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevant' | 'newest' | 'highest'>('relevant');
  const [layout, setLayout] = useState<'carousel' | 'grid'>(defaultLayout);
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
  
  // Carousel scroll container ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    let list = [...REVIEWS_LIST];

    if (activeTopic !== 'all') {
      list = list.filter((r) => r.category === activeTopic);
    }

    if (sortBy === 'newest') {
      list.sort((a, b) => a.timestampOrder - b.timestampOrder);
    } else if (sortBy === 'relevant') {
      list.sort((a, b) => b.relevanceScore - a.relevanceScore);
    } else if (sortBy === 'highest') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeTopic, sortBy]);

  // Handle carousel scroll state
  const checkScrollBounds = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.82;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollBounds, 350);
    }
  };

  const toggleOwnerReply = (reviewId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  // Helper to extract initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section id={id} className={`py-16 md:py-24 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 ${className}`}>
      {/* Studio Trust Header */}
      <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[24px] p-6 sm:p-10 mb-12 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#EAD3CE]/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#6E4E53]">
                Client Reviews and Verification
              </span>
              <span className="text-[#362E2B]/30">&middot;</span>
              <span className="text-xs text-[#9CAA8C] font-medium flex items-center gap-1">
                <CheckCircle size={14} weight="bold" />
                Google Business Profile
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#362E2B] font-normal capitalize">
              {GOOGLE_PROFILE.name}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-[#362E2B]/75">
              <MapPin size={16} className="text-[#9CAA8C] shrink-0" weight="bold" />
              <span>{GOOGLE_PROFILE.address}</span>
            </div>
          </div>

          {/* Aggregate Rating Scorecard */}
          <div className="flex items-center gap-5 bg-white/80 border border-[#EAD3CE] rounded-2xl p-4 sm:p-5 shrink-0">
            <div className="text-center">
              <span className="font-display text-4xl sm:text-5xl text-[#362E2B] font-normal leading-none block">
                5.0
              </span>
              <span className="text-[11px] text-[#6E4E53] font-medium uppercase tracking-wide block mt-1">
                Score
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[#C98A2C]">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={18} weight="fill" />
                ))}
              </div>
              <p className="text-xs font-semibold text-[#362E2B]">
                {GOOGLE_PROFILE.totalReviews} verified reviews
              </p>
              <p className="text-[11px] text-[#9CAA8C]">
                100% 5-star ratings across Adelaide
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Layout Switcher Controls */}
        <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Topic Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {GOOGLE_PROFILE.topics.map((t) => {
              const isActive = activeTopic === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTopic(t.id)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#6E4E53] text-[#FAF5EF] shadow-xs'
                      : 'bg-white border border-[#EAD3CE] text-[#362E2B]/80 hover:bg-[#FAF5EF]'
                  }`}
                >
                  {t.label} {t.count ? `(${t.count})` : ''}
                </button>
              );
            })}
          </div>

          {/* Sort and View Toggle Controls */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-[#362E2B]/80">
              <span className="font-medium text-[#6E4E53]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#EAD3CE] rounded-lg px-2.5 py-1.5 text-xs text-[#362E2B] focus:outline-none focus:border-[#9CAA8C] cursor-pointer"
              >
                <option value="relevant">Most relevant</option>
                <option value="newest">Newest</option>
                <option value="highest">Highest rating</option>
              </select>
            </div>

            {/* Layout Toggle Buttons */}
            <div className="flex items-center bg-white border border-[#EAD3CE] rounded-lg p-0.5">
              <button
                onClick={() => setLayout('carousel')}
                title="Carousel View"
                className={`p-1.5 rounded-md transition-colors ${
                  layout === 'carousel'
                    ? 'bg-[#6E4E53] text-white'
                    : 'text-[#362E2B]/60 hover:text-[#362E2B]'
                }`}
              >
                <Rows size={16} weight="bold" />
              </button>
              <button
                onClick={() => setLayout('grid')}
                title="Grid View"
                className={`p-1.5 rounded-md transition-colors ${
                  layout === 'grid'
                    ? 'bg-[#6E4E53] text-white'
                    : 'text-[#362E2B]/60 hover:text-[#362E2B]'
                }`}
              >
                <SquaresFour size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Header (Shown when in carousel mode) */}
      {layout === 'carousel' && (
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs text-[#362E2B]/70 font-medium">
            Showing {filteredReviews.length} client stories from the Lightsview studio
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              disabled={!canScrollLeft}
              aria-label="Previous reviews"
              className={`p-2.5 rounded-full border border-[#EAD3CE] transition-all ${
                canScrollLeft
                  ? 'bg-white text-[#362E2B] hover:bg-[#FAF5EF] cursor-pointer'
                  : 'bg-white/40 text-[#362E2B]/30 cursor-not-allowed'
              }`}
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              disabled={!canScrollRight}
              aria-label="Next reviews"
              className={`p-2.5 rounded-full border border-[#EAD3CE] transition-all ${
                canScrollRight
                  ? 'bg-white text-[#362E2B] hover:bg-[#FAF5EF] cursor-pointer'
                  : 'bg-white/40 text-[#362E2B]/30 cursor-not-allowed'
              }`}
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      )}

      {/* Review Content: Carousel vs Grid */}
      {layout === 'carousel' ? (
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollBounds}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        >
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="min-w-[300px] sm:min-w-[360px] md:min-w-[400px] max-w-[420px] shrink-0 snap-start bg-[#FAF5EF] border border-[#EAD3CE] rounded-[22px] p-6 sm:p-7 shadow-xs flex flex-col justify-between"
            >
              <ReviewCardContent 
                review={review} 
                isExpanded={!!expandedReplies[review.id]}
                onToggleReply={() => toggleOwnerReply(review.id)}
                getInitials={getInitials}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[22px] p-6 sm:p-7 shadow-xs flex flex-col justify-between"
            >
              <ReviewCardContent 
                review={review} 
                isExpanded={!!expandedReplies[review.id]}
                onToggleReply={() => toggleOwnerReply(review.id)}
                getInitials={getInitials}
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty State Guard */}
      {filteredReviews.length === 0 && (
        <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-2xl p-12 text-center my-6">
          <p className="text-sm text-[#362E2B]/70 mb-3">
            No reviews found under this specific category filter.
          </p>
          <button
            onClick={() => setActiveTopic('all')}
            className="px-5 py-2 rounded-full bg-[#6E4E53] text-[#FAF5EF] text-xs font-medium"
          >
            Show All 60 Reviews
          </button>
        </div>
      )}

      {/* Bottom Attestation */}
      <div className="mt-12 text-center space-y-2">
        <p className="text-xs text-[#9CAA8C] uppercase tracking-wider font-semibold">
          Authentic client experiences &middot; Northfield and Lightsview home studio
        </p>
        <p className="text-xs text-[#362E2B]/60 max-w-xl mx-auto">
          Every review above is publicly posted by real clients on Google. No paid endorsements or altered ratings.
        </p>
      </div>
    </section>
  );
};

interface ReviewCardContentProps {
  review: ReviewItem;
  isExpanded: boolean;
  onToggleReply: () => void;
  getInitials: (name: string) => string;
}

const ReviewCardContent: React.FC<ReviewCardContentProps> = ({
  review,
  isExpanded,
  onToggleReply,
  getInitials,
}) => {
  return (
    <>
      <div className="space-y-4">
        {/* Reviewer Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EAD3CE]/60 text-[#6E4E53] font-semibold text-xs flex items-center justify-center border border-[#EAD3CE]">
              {getInitials(review.author)}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#362E2B] leading-tight">
                {review.author}
              </h4>
              <div className="flex items-center gap-1.5 text-[11px] text-[#362E2B]/60 mt-0.5">
                {review.role && <span>{review.role}</span>}
                {review.reviewsCount && (
                  <>
                    <span>&middot;</span>
                    <span>{review.reviewsCount}</span>
                  </>
                )}
                {review.photosCount && (
                  <>
                    <span>&middot;</span>
                    <span>{review.photosCount}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <span className="text-[11px] text-[#362E2B]/50 shrink-0">
            {review.timeAgo}
          </span>
        </div>

        {/* Rating Stars & Category Badge */}
        <div className="flex items-center justify-between pt-1 border-t border-[#EAD3CE]/40">
          <div className="flex items-center gap-1 text-[#C98A2C]">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} size={14} weight="fill" />
            ))}
          </div>
          <span className="text-[11px] font-medium text-[#6E4E53] bg-[#FAF5EF] px-2.5 py-0.5 rounded-full border border-[#EAD3CE]">
            {review.categoryLabel}
          </span>
        </div>

        {/* Review Text */}
        <p className="text-sm text-[#362E2B]/90 font-display italic leading-relaxed pt-1">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Studio Owner Response Section */}
      {review.ownerReply && (
        <div className="mt-5 pt-4 border-t border-[#EAD3CE]/50">
          <button
            onClick={onToggleReply}
            className="flex items-center justify-between w-full text-left text-xs font-medium text-[#6E4E53] hover:text-[#362E2B] transition-colors py-1 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <ChatCircleText size={14} weight="bold" className="text-[#9CAA8C]" />
              <span>Studio Response from Falguni</span>
            </span>
            {isExpanded ? (
              <CaretUp size={12} weight="bold" />
            ) : (
              <CaretDown size={12} weight="bold" />
            )}
          </button>

          {isExpanded && (
            <div className="mt-2.5 p-3.5 rounded-xl bg-white/70 border border-[#EAD3CE]/60 text-xs text-[#362E2B]/80 leading-relaxed">
              <div className="flex items-center justify-between text-[10px] text-[#9CAA8C] font-semibold uppercase tracking-wider mb-1">
                <span>Falguni (Studio Owner)</span>
                <span>{review.ownerReply.timeAgo}</span>
              </div>
              <p className="italic">
                &ldquo;{review.ownerReply.text}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
