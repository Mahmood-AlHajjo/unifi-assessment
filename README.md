# Munich Bike Watch 🚲

A React application for displaying and managing stolen bike reports in the Munich area. Built for the Munich Police Department to efficiently track and resolve stolen bike cases.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![styled-components](https://img.shields.io/badge/styled--components-6-pink)

## 🎯 Features

- ✅ Display list of reported bike thefts for the Munich area
- ✅ Pagination with 10 cases per page
- ✅ Total count of bike theft cases
- ✅ Detailed information for each case:
  - Case title
  - Case description
  - Date of theft
  - Date reported
  - Location of theft
  - Picture of the bike (when available)
- ✅ Filter by partial case title (search)
- ✅ Filter by date range (client-side)
- ✅ Loading state with skeleton cards
- ✅ Error state with retry option
- ✅ Empty state for no results

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** styled-components (CSS-in-JS)
- **Linting:** ESLint
- **API:** BikeIndex API v3

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- yarn or npm

### Installation

```bash
# Clone the repository
git clone git@github_mahmoud:Mahmood-AlHajjo/unifi-assessment.git
cd unifi-assessment

# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
yarn build
yarn start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page component
├── components/
│   ├── BikeTheftList.tsx  # Main list component with filters
│   ├── Icons.tsx          # SVG icon components
│   └── styled/
│       └── index.ts       # All styled-components
├── lib/
│   └── registry.tsx       # styled-components SSR registry
├── services/
│   └── bikeApi.ts         # API service layer
└── types/
    └── bike.ts            # TypeScript interfaces
```

## 🔌 API Integration

This application uses the [BikeIndex API v3](https://bikeindex.org/documentation/api_v3).

### Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /api/v3/search` | Fetch stolen bikes with filters |
| `GET /api/v3/search/count` | Get total count of results |

### Query Parameters

- `page` - Page number (1-indexed)
- `per_page` - Results per page (max 100, we use 10)
- `location` - Location for proximity search ("Munich")
- `stolenness` - Type of results ("proximity" for stolen bikes near location)
- `query` - Full-text search query

## ⚠️ API Limitations

### Date Range Filtering

The BikeIndex API **does not support server-side date range filtering**. The API does not accept `date_from` or `date_to` parameters for filtering stolen bike results by theft date.

**Current Implementation:**
- Date filtering is implemented client-side
- When a date range is applied, the current page's results are filtered
- This means:
  - Not all bikes within the date range may be shown
  - The total count still reflects unfiltered results
  - Users are notified of this limitation via a warning message

**Possible Future Solutions:**
1. Fetch all results and implement full client-side filtering (performance impact)
2. Implement a backend proxy that caches and filters results
3. Request API enhancement from BikeIndex maintainers

### Rate Limiting

The API has rate limiting for unauthenticated requests. For production use, consider:
- Adding an API access token
- Implementing request caching
- Adding retry logic with exponential backoff

## 🎨 Design Decisions

- **Dark Theme:** Professional look suitable for police department use
- **Responsive Design:** Works on desktop, tablet, and mobile devices
- **Animated Cards:** Staggered fade-in animation for better UX
- **Skeleton Loading:** Provides visual feedback during data fetching
- **Clear Error States:** Helpful error messages with retry functionality

## 📝 Scripts

```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn start    # Start production server
yarn lint     # Run ESLint
```

## 🔗 Links

- [BikeIndex Website](https://bikeindex.org)
- [BikeIndex API Documentation](https://bikeindex.org/documentation/api_v3)
- [BikeIndex GitHub](https://github.com/bikeindex/bike_index)

## 📄 License

This project is built for assessment purposes.

---

Built with ❤️ for the UNIFI Solutions assessment
