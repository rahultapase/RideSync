import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");

  if (!searchText) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    const url = new URL(process.env.NEXT_PUBLIC_MAPBOX_BASE_SUGGEST_URL as string);
    url.searchParams.set("q", searchText);
    url.searchParams.set("language", "en");
    url.searchParams.set("limit", "10");
    url.searchParams.set("country", "IN");  // Add country filter for India
    url.searchParams.set("types", "place,locality,neighborhood,address");  // Specify types
    url.searchParams.set(
      "session_token",
      process.env.MAPBOX_SESSION_TOKEN as string
    );
    url.searchParams.set(
      "access_token",
      process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN as string
    );

    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Mapbox API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    // Transform the response to include full address information
    const suggestions = data.suggestions.map((suggestion: any) => ({
      mapbox_id: suggestion.mapbox_id,
      full_address: suggestion.place_name || suggestion.name,
      coordinates: suggestion.coordinates,
      place_formatted: `${suggestion.name}, ${suggestion.place_formatted || suggestion.place_name}`
    }));

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error fetching from Mapbox:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Mapbox" },
      { status: 500 }
    );
  }
}