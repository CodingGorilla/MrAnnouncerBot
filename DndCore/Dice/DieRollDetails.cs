﻿using System;
using System.Linq;
using System.Collections.Generic;

namespace DndCore
{
	/// <summary>
	/// Converts a text representation of dice - like "1d4(fire)" -- to an object.
	/// </summary>
	public class DieRollDetails
	{
		List<Roll> rolls = new List<Roll>();

		public DieRollDetails()
		{

		}
		public override string ToString()
		{
			string result = string.Empty;
			
			foreach (Roll roll in rolls)
			{
				if (!string.IsNullOrWhiteSpace(result))
					result += ",";
				result += roll.ToString();
			}
			if (ImpactsTargetOnStartOfTurn)
				result = "^" + result;
			return result;
		}
		
		public Roll GetRoll(int sides)
		{
			return rolls.FirstOrDefault(x => x.Sides == sides);
		}

		public Roll GetRoll(int sides, string descriptor)
		{
			return rolls.FirstOrDefault(x => x.Sides == sides && x.Descriptor == descriptor);
		}

		public List<Roll> Rolls { get => rolls; set => rolls = value; }
		public bool ImpactsTargetOnStartOfTurn { get; set; }

		public void AddRoll(string dieStr, int spellcastingAbilityModifier = int.MinValue)
		{
			if (string.IsNullOrEmpty(dieStr))
				return;
			Roll roll = Roll.From(dieStr, spellcastingAbilityModifier);
			if (roll == null)
				return;
			Roll existingRollSameDie = GetRoll(roll.Sides, roll.Descriptor);
			if (existingRollSameDie != null)
			{
				existingRollSameDie.Count += roll.Count;
				existingRollSameDie.Offset += roll.Offset;
				return;
			}
			rolls.Add(roll);
		}
		
		public static DieRollDetails From(string str, int spellcastingAbilityModifier = int.MinValue)
		{
			DieRollDetails dieRollDetails = new DieRollDetails();
			if (str.StartsWith("^"))
			{
				str = str.Substring(1);
				dieRollDetails.ImpactsTargetOnStartOfTurn = true;
			}
			string[] split = str.Split(',');
			foreach (string dieStr in split)
				dieRollDetails.AddRoll(dieStr, spellcastingAbilityModifier);
			return dieRollDetails;
		}
		
	}
}
