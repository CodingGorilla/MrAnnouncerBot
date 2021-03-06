﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using DndCore;
using TwitchLib.Client;
using TwitchLib.Client.Models;

namespace DHDM
{
	public class SavingThrowNowCommand : BaseStreamDeckCommand, IDungeonMasterCommand
	{
		Ability abilityToTest;
		bool testAllPlayers;
		bool testSelectedPlayers;

		public void Execute(IDungeonMasterApp dungeonMasterApp, ChatMessage chatMessage)
		{
			List<int> playerIds = GetPlayerIds(dungeonMasterApp, testAllPlayers);
			if (testSelectedPlayers)
				playerIds = null;

			dungeonMasterApp.RollSavingThrow(abilityToTest, playerIds);
		}

		public bool Matches(string message)
		{
			testAllPlayers = false;
			Match match = Regex.Match(message, @"^sv\s+(\w+)" + PlayerSpecifier);
			if (match.Success)
			{
				SetTargetPlayer(match.Groups);
				abilityToTest = DndUtils.ToAbility(match.Groups[1].Value);
				return abilityToTest != Ability.none;
			}
			match = Regex.Match(message, @"^svs\s+(\w+)$");
			if (match.Success)
			{
				testSelectedPlayers = true;
				abilityToTest = DndUtils.ToAbility(match.Groups[1].Value);
				return abilityToTest != Ability.none;
			}
			match = Regex.Match(message, @"^sva\s+(\w+)$");
			if (match.Success)
			{
				testAllPlayers = true;
				abilityToTest = DndUtils.ToAbility(match.Groups[1].Value);
				return abilityToTest != Ability.none;
			}
			return false;
		}
	}
}
