'use client'

import { useSession } from 'next-auth/react'
import { createContext, useCallback, useReducer } from 'react'

export const DBContext = createContext()

const databaseReducer = (state, action) => {
	//based on different types of action we return different values
	switch (action.type) {
		case 'INIT':
			return {
				...state,
				recipes: action.payload.recipes,
				users: action.payload.users,
			}
		case 'GET_CURRENT_USER':
			return { ...state, user: action.payload }

		case 'GET_RECIPE_USER':
			return { ...state, recipeUser: action.payload }

		case 'GET_USERS':
			return { ...state, users: action.payload }

		case 'GET_RECIPES':
			return { ...state, recipes: action.payload }

		case 'GET_CURRENT_USER_RECIPES':
			return { ...state, currentUserRecipes: action.payload }

		case 'CONNECT_USER_TO RECIPES':
			return {
				...state,
				userRecipes: action.payload.userRecipes,
				recipeUser: action.payload.recipeUser,
			}

		case 'GET_SINGLE_RECIPE':
			return {
				...state,
				singleRecipe: action.payload.singleRecipe,
				recipeUser: action.payload.recipeUser,
			}
		default:
			return state
	}
}

//create Database context provider
export function DatabaseProvider({ children }) {
	const { data: session } = useSession()
	const [state, dispatch] = useReducer(databaseReducer, {
		recipes: [],
		users: [],
		currentUserRecipes: [],
		user: null,
		userRecipes: [],
		recipeUser: null,
		singleRecipe: null,
	})

	const getCurrentUser = useCallback(async () => {
		if (session) {
			const currentUser = state.users.filter(
				u => u.email === session?.user?.email
			)

			dispatch({
				type: 'GET_CURRENT_USER',
				payload: currentUser[0],
			})

			if (currentUser && state.recipes) {
				const currentUserRecipesData = state.recipes.filter(
					rec => rec.user === currentUser[0]._id.toString()
				)

				dispatch({
					type: 'GET_CURRENT_USER_RECIPES',
					payload: currentUserRecipesData,
				})

				if (
					currentUser &&
					currentUserRecipesData &&
					currentUser.length !== 0 &&
					currentUserRecipesData.length !== 0
				) {
					return [currentUser[0], currentUserRecipesData]
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session, state.users])

	//get all user data and user recipes for profile page
	const getSingleUserData = useCallback(async id => {
		if (state.users && state.recipes) {
			const userRecipesData = state.recipes.filter(rec => rec.user === id)
			const userData = state.users.filter(u => u._id.toString() === id)

			dispatch({
				type: 'CONNECT_USER_TO RECIPES',
				payload: { userRecipes: userRecipesData, recipeUser: userData[0] },
			})
			if (
				userRecipesData &&
				userData &&
				userRecipesData.length !== 0 &&
				userData.length !== 0
			) {
				return [userRecipesData, userData[0]]
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	//get all user data and recipe data for recipe card and recipe details
	const getSingleRecipeData = useCallback(async recipeId => {
		if (state.users && state.recipes) {
			const userRecipeData = state.recipes.filter(rec => rec._id === recipeId)

			const userData = state.users.filter(
				u => u._id.toString() === userRecipeData[0]?.user
			)

			dispatch({
				type: 'GET_SINGLE_RECIPE',
				payload: { singleRecipe: userRecipeData[0], recipeUser: userData[0] },
			})

			if (
				userRecipeData &&
				userData &&
				userRecipeData.length !== 0 &&
				userData.length !== 0
			) {
				return [userRecipeData[0], userData[0]]
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getUsersAndRecipes = useCallback(async () => {
		try {
			//get all recipes
			const recipeResponse = await fetch('/api/recipes')
			const recipeData = await recipeResponse.json()
			//get all users
			const response = await fetch(`/api/users`)
			const data = await response.json()
			if (recipeData && data) {
				dispatch({
					type: 'INIT',
					payload: { recipes: recipeData, users: data },
				})

				if (
					recipeData &&
					data &&
					recipeData.length !== 0 &&
					data.length !== 0
				) {
					return [recipeData, data]
				}
			}
		} catch (error) {
			console.log(error)
		}
	}, [])
	console.log(state)
	return (
		<DBContext.Provider
			value={{
				...state,
				getSingleUserData,
				getSingleRecipeData,
				getUsersAndRecipes,
				getCurrentUser,
			}}
		>
			{children}
		</DBContext.Provider>
	)
}
