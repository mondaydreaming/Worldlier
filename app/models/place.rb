class Place < ActiveRecord::Base
  belongs_to :trip
  has_many :notes
  geocoded_by :name
  after_validation :geocode
end
