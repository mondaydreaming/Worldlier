json.array!(@notes) do |note|
  json.extract! note, :id, :comment, :trip_id, :place_id, :user_id
  json.url note_url(note, format: :json)
end
