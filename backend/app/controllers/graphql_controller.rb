class GraphqlController < ApplicationController
  # Skip CSRF token verification for GraphQL requests
  skip_before_action :verify_authenticity_token

  # Add CORS headers
  before_action :set_cors_headers

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      # Query context goes here, for example:
      # current_user: current_user,
    }
    result = BackendSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    
    # Log the result for debugging
    Rails.logger.debug "GraphQL Result: #{result.to_h}"

    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end

  private

  def set_cors_headers
    headers['Access-Control-Allow-Origin'] = 'http://localhost:3002'
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    headers['Access-Control-Allow-Headers'] = '*'
    headers['Access-Control-Allow-Credentials'] = 'true'
  end

  # Handle variables in form data, JSON body, or a blank value
  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) rescue nil
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: 500
  end
end