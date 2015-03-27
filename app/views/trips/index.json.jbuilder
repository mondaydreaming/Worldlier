json.array!(@trips) do |trip|
  json.extract! trip, :id, :sightsnum, :location, :location_radius, :tag, :user_id
  json.url trip_url(trip, format: :json)
end
