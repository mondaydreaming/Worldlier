class Trip < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :places
  geocoded_by :location
  after_validation :geocode
end
