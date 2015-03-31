class Trip < ActiveRecord::Base
  belongs_to :user
  has_many :places
  geocoded_by :location
  after_validation :geocode
end
