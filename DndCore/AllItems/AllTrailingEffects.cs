﻿using System;
using System.Linq;
using System.Collections.Generic;
using GoogleHelper;

namespace DndCore
{
	public static class AllTrailingEffects
	{
		public static void Invalidate()
		{
			trailingEffects = null;
		}

		static void LoadData()
		{
			List<TrailingEffectsDto> trailingEffectsDtos = GoogleSheets.Get<TrailingEffectsDto>(Folders.InCoreData("DnD - TrailingEffects.csv"), false);
			trailingEffects = new List<TrailingEffect>();
			foreach (TrailingEffectsDto trailingEffect in trailingEffectsDtos)
			{
				trailingEffects.Add(TrailingEffect.From(trailingEffect));
			}
		}

		static List<TrailingEffect> trailingEffects;
		public static List<TrailingEffect> TrailingEffects
		{
			get
			{
				if (trailingEffects == null)
					LoadData();
				return trailingEffects;
			}
			private set
			{
				trailingEffects = value;
			}
		}
		
		public static TrailingEffect Get(string effectName)
		{
			return TrailingEffects.FirstOrDefault(x => x.Name == effectName);
		}
		
		public static string GetList(string separator)
		{
			return string.Join(separator, TrailingEffects.Select(x => x.Name).Where(x => !string.IsNullOrWhiteSpace(x)).ToArray());
		}
	}
}
