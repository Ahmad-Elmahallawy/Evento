# Evento

A cross-platform mobile app built with React Native and Expo, allowing users to create, manage, and join events. The app features event organization, attendance tracking, and real-time communication between participants.

## Table of Contents

* [Features](#features)
* [Learning Focus](#learning-focus)
* [Project Structure](#project-structure)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)

## Features

* User registration and login using ASP.NET Core 8
* Create and manage events
* RSVP and check-in for events
* Messaging system for event participants
* Admin panel for event organizers
* Store event data and user information in MS SQL Server
* Push notifications for event updates

## Learning Focus

* User roles and permissions
* Real-time communication
* Data management
* Push notifications

## Project Structure

* `Client`: React Native + Expo frontend
* `Server`: ASP.NET Core 8 backend with MS SQL Server database

## Technologies Used

* React Native
* Expo
* ASP.NET Core 8
* MS SQL Server

## Getting Started

### Prerequisites

* Node.js (version 14 or higher)
* .NET Core 8
* MS SQL Server

### Installation

#### Client (React Native + Expo)

1. Clone the repository: `git clone https://github.com/Ahmad-Elmahallawy/Evento.git`
2. Navigate to the `Client` folder: `cd Client`
3. Install dependencies: `npm install`
4. Start the frontend: `npx expo start --tunnel`

#### Server (ASP.NET Core 8)

1. Navigate to the `Server` folder: `cd Server/Server`
2. Install dependencies: `dotnet restore`
3. Start the backend: `dotnet run`

### Configuration

* Update the `appsettings.json` file in the `Server` folder with your MS SQL Server connection string.
