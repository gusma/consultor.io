# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3002' # Change to your frontend URL if different
    resource '*',
             headers: :any,
             methods: [:get, :post, :options, :delete, :put],
             credentials: true # Allow credentials to be sent
  end
end