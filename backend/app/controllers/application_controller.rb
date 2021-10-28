class ApplicationController < ActionController::API
    def index
        render json: { status: 200, message: "Hello World!"}
    end
end
