class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to user_url
    else
      redirect_to user_index_url
    end
  end


  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
