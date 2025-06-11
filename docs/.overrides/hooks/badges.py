# Minecraft monitor
# Copyright (C) 2028-Present  Kevin Traini
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along
# with this program; if not, write to the Free Software Foundation, Inc.,
# 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

# Inspired from https://github.com/squidfunk/mkdocs-material/blob/406a3ad81a87dbb4922b799e6f5fc16028a8186b/src/overrides/hooks/shortcodes.py

import re
import logging

from re import Match
from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.files import Files
from mkdocs.structure.pages import Page

log = logging.getLogger('mkdocs')

def on_page_markdown(markdown: str, *, page: Page, config: MkDocsConfig, files: Files):
    def replaceCallback(match: Match):
        [name, args] = match.groups()
        match name:
            case "config-required":
                return _badge_config_required(name, args)
            case "config-type":
                return _badge_config_type(args)
            case "config-default-value":
                return _badge_config_default_value(args)
            case _:
                raise RuntimeError(f"Unknown badge name: '{name}'")

    return re.sub(
        r"<!-- badge:([\w\-]+)( .*?)? -->",
        replaceCallback, markdown, flags=re.IGNORECASE
    )

def __badge(icon: str, text: str):
    return "".join([
        "<span class=\"md-badge\">",
        *(f"<span class=\"md-badge--icon\">{icon}</span>" if icon else []),
        *(f"<span class=\"md-badge--text\">{text}</span>" if text else []),
        "</span>",
    ])

def _badge_config_required(name: str, args: None | str):
    return __badge(
        ":material-asterisk:{ title=\"Required\" }",
        args.strip() if not args is None else "required",
    )

def _badge_config_type(args: None | str):
    return __badge(
        ":fontawesome-solid-t:{ title=\"Type\" }",
        args.strip() if not args is None else "",
    )

def _badge_config_default_value(args: None | str):
    return __badge(
        ":fontawesome-solid-droplet:{ title=\"Default value\" }",
        args.strip() if not args is None else "",
    )
