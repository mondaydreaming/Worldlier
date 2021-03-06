class TripsController < ApplicationController
  before_action :set_trip, only: [:show, :edit, :update, :destroy]
  # GET /trips
  # GET /trips.json
  def index
    @trips = Trip.all
    render :json => @trips
  end

  # GET /trips/1
  # GET /trips/1.json
  def show
  end

  # GET /trips/new
  def new
    @trip = Trip.new
  end

  # GET /trips/1/edit
  def edit
  end

  # POST /trips
  # POST /trips.json
  def create
    @trip = Trip.new(trip_params)

    respond_to do |format|
      if @trip.save

        @client = GooglePlaces::Client.new("AIzaSyDslRFZO4CcrhN9M9gchkS0VKLWrOB8J_Y")

        # @attractions = JSON.parse(@trip.tag).join(' ')
        places = @client.spots_by_query("tourist landmark in #{@trip.location} ", :radius => @trip.location_radius, :exclude => 'lodging')

        # https://maps.googleapis.com/maps/api/place/textsearch/json?query=points+of+interest+for+tourists+in+aberdeen&radius=5000&key=AIzaSyCsJcCSDOx5fdOlmWagQZabLeAe6EGxNSI

        places.take(@trip.sightsnum).each do |place|
          if place.photos[0]
            photo_url = place.photos[0].fetch_url(800)
          end
          p = @trip.places.create :name => place.name, :google_id => place.place_id, :latitude => place.lat, :longitude => place.lng, :photo_url => photo_url
        end

        format.html { redirect_to @trip, notice: 'Trip was successfully created.' }
        format.json { render :show, status: :created, location: @trip }
      else
        format.html { render :new }
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /trips/1
  # PATCH/PUT /trips/1.json
  def update
    respond_to do |format|
      if @trip.update(trip_params)
        format.html { redirect_to @trip, notice: 'Trip was successfully updated.' }
        format.json { render :show, status: :ok, location: @trip }
      else
        format.html { render :edit }
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trips/1
  # DELETE /trips/1.json
  def destroy
    @trip.destroy
    respond_to do |format|
      format.html { redirect_to trips_url, notice: 'Trip was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trip
      @trip = Trip.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def trip_params
      params.require(:trip).permit(:sightsnum, :location, :location_radius, :tag, :user_id)
    end
end
