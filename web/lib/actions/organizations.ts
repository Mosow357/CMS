'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createApiClient } from '@/lib/api/client'
import { ActionResponse } from './auth'

export interface CreateOrganizationData {
  name: string
  description?: string
  questionText?: string
}

export interface Organization {
  id: string
  name: string
  description: string
  logoUrl?: string
  questionText?: string
  createdAt: Date
  updatedAt: Date
}

export async function createOrganizationAction(
  data: CreateOrganizationData
): Promise<ActionResponse<Organization>> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      redirect('/login')
    }

    const apiClient = createApiClient(token)

    const response = await apiClient.organizations.organizationsControllerCreate(
      {
        name: data.name,
        description: data.description,
        questionText: data.questionText,
      },
      { format: 'json' }
    )

    const organization = response.data as unknown as Organization

    // Revalidate the organizations list
    revalidatePath('/dashboard/organizations')
    revalidatePath('/dashboard')

    return {
      success: true,
      data: organization,
    }
  } catch (error: any) {
    console.error('Create organization error:', error)

    // Extract error message from response
    let errorMessage = 'Error de conexión. Por favor intenta nuevamente.'
    if (error?.error?.message) {
      errorMessage = error.error.message
    } else if (error?.error?.error) {
      errorMessage = error.error.error
    } else if (typeof error?.error === 'string') {
      errorMessage = error.error
    }

    // If unauthorized, redirect to login
    if (error?.error?.statusCode === 401 || error?.status === 401) {
      redirect('/login')
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}

export async function getUserOrganizationsAction(): Promise<ActionResponse<Organization[]>> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      // Return empty array if not authenticated (user can still see "Add" option)
      return {
        success: true,
        data: [],
      }
    }

    const apiClient = createApiClient(token)

    const response = await apiClient.organizations.organizationsControllerFindUserOrganizations({
      format: 'json',
    })

    const organizations = response.data as unknown as Organization[]

    return {
      success: true,
      data: organizations || [],
    }
  } catch (error: any) {
    console.error('Get organizations error:', error)

    // If unauthorized, return empty array (don't redirect, allow user to see sidebar)
    if (error?.error?.statusCode === 401 || error?.status === 401) {
      return {
        success: true,
        data: [],
      }
    }

    // For other errors, return empty array gracefully
    return {
      success: true,
      data: [],
    }
  }
}

