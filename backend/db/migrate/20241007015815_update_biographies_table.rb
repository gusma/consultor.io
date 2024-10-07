class UpdateBiographiesTable < ActiveRecord::Migration[6.1]
  def change
    # Add any missing columns
    add_column :biographies, :content, :text unless column_exists?(:biographies, :content)
    
    # Add the patient reference if it doesn't exist
    unless column_exists?(:biographies, :patient_id)
      add_reference :biographies, :patient, null: false, foreign_key: true, index: { unique: true }
    end

    # Ensure the patient_id is unique
    add_index :biographies, :patient_id, unique: true, if_not_exists: true
  end
end